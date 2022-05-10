const contadorCarrito = document.getElementById('contador-carrito');
const precioTotal = document.getElementById('precioTotal');

export const actualizarCarrito = (carritoDeCompras) =>{
    /* console.log(carritoDeCompras) */
    contadorCarrito.innerText = carritoDeCompras.reduce((acc,el) => acc + el.cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((acc,el) => acc +(el.precio * el.cantidad), 0);
    //Añado al local storage el carrito
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}
