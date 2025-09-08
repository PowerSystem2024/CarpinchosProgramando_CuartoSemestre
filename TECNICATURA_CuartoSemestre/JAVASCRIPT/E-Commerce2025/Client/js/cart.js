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

        const totalPrice = document.createElement("div");
        totalPrice.className = "total-price";
        totalPrice.innerText = `Total: $${total}`;

        const checkoutBtn = document.createElement("button");
        checkoutBtn.className = "btn-primary";
        checkoutBtn.id = "checkout-btn";
        checkoutBtn.innerText = "Ir a pago";

        const buttonCheckout = document.createElement("div");
        buttonCheckout.id = "button-checkout";

        modalFooter.append(totalPrice, checkoutBtn, buttonCheckout);
        modalContainer.append(modalFooter);

        // Inicialización de Mercado Pago (Frontend SDK)
        const mercadopago = new MercadoPago("APP_USR-cbd72d05-9943-4bd8-b058-e0804a07d0be", {
            locale: "es-AR",
        });
        const checkoutButton = modalFooter.querySelector("#checkout-btn");

        checkoutButton.addEventListener("click", async function () {
        try{
            console.log("Botón 'Ir a pago' clickeado ✅");
            checkoutButton.remove(); // ocultamos el botón manual
            const orderData = {
                title: "Compra de E-commerce",
                quantity: 1,
                price: total,
            };
            const response = await fetch("http://localhost:8080/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });
            const preference = await response.json();
            console.log("Preferencia recibida en frontend:", preference);
            console.log("ID recibido:", preference.id);
            createCheckoutButton(preference.id);
            }catch(error) {
                    console.error("Error al crear la preferencia:", error);
                };
        });

        function createCheckoutButton(preferenceId) {
            console.log("Inicializando Brick con preferenceId:", preferenceId);
            const bricksBuilder = mercadopago.bricks();
            console.log("¿Existe el div 'button-checkout'?", document.getElementById("button-checkout"));
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