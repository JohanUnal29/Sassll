

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
let productos = [];
let productos2 = [];


//función para mostrar productos index

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `; 

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
    
}

//mostrando productos en index llamados de la "base de datos" hecha con json (API), usando asincronía y promesas

const pedirProductos = (res) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            res === true ? resolve(productos) : reject("No se puedo conectar a la base de datos");
        }, 1000);
    })
}
    
fetch("./js/productosIndex.json")
.then(response => response.json())
.then(data => {
    let valor = true;
    productos = data;
    pedirProductos(valor)
        .then((res) => {
            productos2 = res;
            cargarProductos(productos2);
        })
        
}).catch(() => {
    let valor = false;
    pedirProductos(valor)
        .catch((res) => {
            console.log(res)
        })
})


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
    actualizarNumerito();
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    location.reload();
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}





//carrito lateral

const botonModalDerecha = document.querySelector("#boton-modal-derecha");
const modalDerecha = document.querySelector("#modal-derecha");
const cerrarModalDerecha = document.querySelector("#cerrar-modal-derecha");
const BorrarNext = document.getElementById('Next');



botonModalDerecha.addEventListener("click", () => {
    modalDerecha.classList.add("active");
    BorrarNext.classList.add("active");
}) 

cerrarModalDerecha.addEventListener("click", () => {
    modalDerecha.classList.remove("active");
    BorrarNext.classList.remove("active");
    location.reload();
})


//carrito desplegable
let productosEnCarrito2 = localStorage.getItem("productos-en-carrito");
productosEnCarrito2 = JSON.parse(productosEnCarrito2);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");

let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito2 && productosEnCarrito2.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito2.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `

            <div class="grid-container">
                <header class="headerr"><a>${producto.titulo}<a></header>
                <nav class="navbarr"><img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}"></nav>
                <aside class="sidebar"><a>${producto.cantidad}</a></aside>
                <aside class="sidebar2"><a>$ ${producto.precio}</a></aside>
                <aside class="footerr"><button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button></aside>
                <aside class="footerr2"><a>$ ${producto.precio * producto.cantidad}</a></aside>
            </div>
            
            `;
    
            contenedorCarritoProductos.append(div);
            
        })
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        
    }

    actualizarBotonesEliminar();
    actualizarTotal();
    
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
       
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito2.findIndex(producto => producto.id === idBoton);

    Swal.fire({
        title: '¿Estás segura?',
        text: "Revisa si hay algo que se acomode más a tus necesidades, tenemos gran variedad de productos :3",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado',
            'Producto eliminado',
            'success'
          )
          productosEnCarrito2.splice(index, 1);
          cargarProductosCarrito();
          localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito2));
        }else{
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito2));
            cargarProductosCarrito();
        }
      })
    
    
    
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    
    Swal.fire({
        title: '¿Estás segura?',
        text: "No te cohibas de consentirte",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No <3',
        confirmButtonText: 'Si :('
      }).then((result) => {
        if (result.isConfirmed) {
            
          Swal.fire(
            'Decisión tomada!',
            'Productos eliminados',
            'success'
          )
          productosEnCarrito2.length = 0;
          localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito2));
          cargarProductosCarrito();

        }else{
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito2));
        cargarProductosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito2.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    Swal.fire({
        title: 'Muchas gracias por tu compra :3',
        width: 600,
        timer: 1500,
        padding: '3em',
        color: '#716add',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })

    productosEnCarrito2.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito2));
    modalDerecha.classList.remove("active");
    BorrarNext.classList.remove("active");
    setTimeout(() => {
        location.reload();
    }, 1500);
    
    
    
}
