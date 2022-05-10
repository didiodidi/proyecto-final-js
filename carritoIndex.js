import { actualizarCarrito } from "./actualizarCarrito.js";
import { productos } from "./stock.js";



const contenedorCarrito = document.getElementById('carrito-contenedor');
let carritoDeCompras = [];


const botonVaciar = document.getElementById('comprar')

botonVaciar.addEventListener('click',()=>{
    carritoDeCompras.lenght = 0;
    actualizarCarrito(carritoDeCompras)
})



export const carritoIndex = (productoId) => {
    if(localStorage.getItem("carrito")) {
        carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
    }
    console.log(carritoDeCompras)
    let productoRepetido = carritoDeCompras.find (producto => producto.id == productoId);
    contarProductosRepetidos(productoRepetido, productoId);
    eliminarProductoCarrito(productoId);
}


//------------->Eliminar Producto<----------------//
export const eliminarProductoCarrito = (productoId, productoNombre ) => {
  console.log(productoNombre);
  if (localStorage.getItem("carrito")){
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
  }
  let botonEliminar = document.getElementById(`eliminar${productoId}`);
  botonEliminar.addEventListener('click', () => {
    swal.fire({
      title:`Se elimino el producto con exito`,
      icon: 'warning',
      buttons: true ,
      dangerMode: true
    }).then((result) => {
      if (result) {
        botonEliminar.parentElement.remove();
        carritoDeCompras = carritoDeCompras.filter(el => el.id != productoId);
        actualizarCarrito(carritoDeCompras);
      }
    })
  })   
}



const contarProductosRepetidos = (prodRepetido, productoId) => {
  if (prodRepetido){
    prodRepetido.cantidad++
    document.getElementById(`cantidad${prodRepetido.id}`).innerHTML = `<p id=cantidad${prodRepetido.id}>Cantidad:${prodRepetido.cantidad}</p>`;
    actualizarCarrito(carritoDeCompras);
  }else{
    renderProductoCarrito(productoId);
  }
}

const renderProductoCarrito =(productoId) => {
  let producto =productos.find(producto => producto.id == productoId);
  carritoDeCompras.push(producto);
  producto.cantidad = 1;
  let div = document.createElement('div');
  div.classList.add('productoEnCarrito');
  div.innerHTML = ` <p>${producto.nombre}</p>
                    <p>Precio:${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="boton-eliminar"><i class="fa-solid fa-trash-can"></i></i></button>
                  `
contenedorCarrito.appendChild(div);
actualizarCarrito(carritoDeCompras);
}







