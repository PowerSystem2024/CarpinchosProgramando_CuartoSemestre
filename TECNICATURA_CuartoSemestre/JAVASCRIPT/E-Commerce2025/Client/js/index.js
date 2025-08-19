const shopContent = document.getElementById("shopContent");
const cart = []; //El carrito es un array vacío

productos.forEach((product) =>{
    const content = document.createElement("div");
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.productName}</h3>
        <p>$ ${product.price} </p>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    // Agregamos el botón al contenido del producto
    content.appendChild(buyButton);

    buyButton.addEventListener("click", () => { // Agregamos un evento click al botón para agregar el producto al carrito
        cart.push({
            id: product.id,
            productName: product.productName,
            price: product.price,
            quantity: product.quantity,
            img: product.img
        })
    console.log(cart);
    })
});
