const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    // Modal Header
    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    modalClose.innerText = "❌";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Carrito de compras";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    modalContainer.appendChild(modalHeader);

    // Modal Body
    if (cart.length > 0) {
        cart.forEach((product) => {
            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
                <div class="product">
                    <img class="product-img" src="${product.img}"/>
                    <div class="product-info">
                        <h4>${product.productName}</h4>
                    </div>
                    <div class="quantity">
                        <span class="quantity-btn-decrese">-</span>
                        <span class="quantity-input">${product.quanty}</span>
                        <span class="quantity-btn-increse">+</span>
                    </div>
                    <div class="price">${product.price * product.quanty} $</div>
                    <div class="delete-product">❌</div>
                </div>
            `;
            modalContainer.append(modalBody);

            // Botones de restar o sumar productos
            const decrese = modalBody.querySelector(".quantity-btn-decrese");
            decrese.addEventListener("click", () => {
                if (product.quanty !== 1) {
                    product.quanty--;
                    displayCart();
                }
                displayCartCounter();
            });

            const increse = modalBody.querySelector(".quantity-btn-increse");
            increse.addEventListener("click", () => {
                product.quanty++;
                displayCart();
                displayCartCounter();
            });

            // Botón Delete
            const deleteProduct = modalBody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", () => {
                deleteCartProduct(product.id);
            });
        });

        // Modal footer
        const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        modalFooter.innerHTML = `
            <div class="total-price">Total: $${total}</div>
            <button class="btn-primary" id="checkout-btn">Ir a pago</button>
            <div id="button-checkout"></div>
        `;
        modalContainer.append(modalFooter);

        // Inicialización de Mercado Pago (Frontend SDK)
        const mercadopago = new MercadoPago("APP_USR-d3921181-622b-4159-a792-8ee73c4cd485", {
            locale: "es-AR",
        });

        const checkoutButton = modalFooter.querySelector("#checkout-btn");

        checkoutButton.addEventListener("click", function () {
            console.log("Botón 'Ir a pago' clickeado ✅");

            checkoutButton.remove(); // ocultamos el botón manual

            const orderData = {
                quantity: 1,
                description: "compra de ecommerce",
                price: total,
            };

            fetch("http://localhost:8080/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            })
                .then((response) => response.json())
                .then((preference) => {
                    console.log("Preference creada:", preference);
                    createCheckoutButton(preference.id);
                })
                .catch((error) => {
                    console.error("Error al crear la preferencia:", error);
                    alert("Error al iniciar el pago");
                });
        });

        function createCheckoutButton(preferenceId) {
            console.log("Inicializando Brick con preferenceId:", preferenceId);

            const bricksBuilder = mercadopago.bricks();

            bricksBuilder.create(
                "wallet",
                "button-checkout", // id del div donde se renderiza
                {
                    initialization: {
                        preferenceId: preferenceId,
                    },
                    customization: {
                        texts: {
                            valueProp: "smart_option", // Muestra "Pagá con Mercado Pago"
                        },
                    },
                    callbacks: {
                        onError: (error) => console.error("Error en el Brick:", error),
                        onReady: () => {
                            console.log("Botón de Mercado Pago listo ✅");
                        },
                    },
                }
            );
        }
    } else {
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = "Su carrito está vacío";
        modalContainer.append(modalText);
    }
};

cartBtn.addEventListener("click", displayCart);

// Función para borrar productos del carrito
const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    console.log("Producto eliminado, id:", foundId);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCounter();
};

// Contador del carrito
const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
    if (cartLength > 0) {
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLength;
    } else {
        cartCounter.style.display = "none";
    }
};