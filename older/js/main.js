// ======================================== CODIGO GENERAL ========================================

// ---------------------------------------- Variables

const carrito           = JSON.parse(localStorage.getItem('carrito')) || [];
const listaProductos    = JSON.parse(sessionStorage.getItem('productos')) || [];

let formatoNumero       = new Intl.NumberFormat('es-AR');
let usuarioLog          = '';
let direction           = true;

// ---------------------------------------- DOM

const ingresar                  = document.getElementById('ingresar');
const sesion                    = document.getElementById('sesion');
const menu                      = document.getElementById('menu');
const mostrarMenu               = menu.children[0];
const contenidoMenu             = menu.children[1];
const cantidadItemsEnCarrito    = document.getElementById('cantidadItemsEnCarrito');

// ---------------------------------------- Clases

// Clase producto
class Producto {

    constructor(id, nombre, marca, categoria, precio, cantidadDisponible, cantidadComprada, envioGratis, imagenesDisponibles, coloresDisponibles, descripcion){
        // Asignar valores
        this.id                     = id;
        this.nombre                 = nombre;
        this.marca                  = marca;
        this.categoria              = categoria;
        this.precio                 = precio;
        this.cantidadDisponible     = cantidadDisponible;
        this.cantidadComprada       = cantidadComprada;
        this.envioGratis            = envioGratis;
        this.imagenesDisponibles    = imagenesDisponibles;
        this.coloresDisponibles     = coloresDisponibles;
        this.descripcion            = descripcion;

        // Adapto nombre
        let nombreAdaptado = this.nombre.toLowerCase();
        while (nombreAdaptado.includes(' ')) {
            nombreAdaptado = nombreAdaptado.replace(' ','-');
        }

        // Asigno imagen y destino
        this.imagen     = `img/${this.id}-${nombreAdaptado}`;
        this.destino    = `products/`;

        // Agregar a lista de productos
        listaProductos.push(this);

    }

    // Por cada venta reduzco la cantidad disponible
    reducirCantidadDisponible(ventas) {
        this.cantidadDisponible -= ventas;
    }

}

let cargo = false;

const insertarProductos = async () => {

    const resultado = await fetch('json/productos.json');
    const respuesta = await resultado.json();
    respuesta.forEach(producto => {
        new Producto(producto.id, producto.nombre, producto.marca, producto.categoria, producto.precio, producto.cantidadDisponible, producto.cantidadComprada, producto.envioGratis, producto.imagenesDisponibles, producto.coloresDisponibles, producto.descripcion);
    });
    
    // Almacenar productos (actua como base de datos (pd: podrias cambiarle el precio y llevartelo gratis ;P))
    sessionStorage.setItem('productos', JSON.stringify(listaProductos));

}

listaProductos.length < 1 && insertarProductos();

// ---------------------------------------- Funciones

// Por cada tres ceros agregar un punto para mejor apariencia
function formatearNumero(numero) {
    return '$' + formatoNumero.format(numero);
}

// Mostrar u ocultar elemento
function changeDisplay(elemento) {
    elemento.classList.toggle('d-none');
}

// Ocultar elemento
function hide(elemento) {
    elemento.classList.add('d-none');
}

// Mostrar icono usuario o ingresar
function mostrarUsuario() {

    // Obtener usuario logeado
    usuarioLog = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');

    // Si hay un usuario logeado mostrar icono de usuario
    if (usuarioLog) {
        ingresar.innerHTML = `
        <a href="/login/">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-person-circle mt-1" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
        </a>
        `;
        sesion.classList.add('d-none');
    }else{
        ingresar.innerHTML = `<a href="/login/" class="nav-link text-white"><p class="m-0">Ingresar</p></a>`;
    }

}

// Mostrar items en carrito
function itemsEnCarrito() {

    // Si hay almenos un elemento en el carrito
    if(carrito.length > 0){
        // Mostrar numero items
        cantidadItemsEnCarrito.className = 'rounded-circle bg-white text-dark number-of-items text-center d-inline-block';
        cantidadItemsEnCarrito.innerText = carrito.length;

    }else{
        // Limpiar
        cantidadItemsEnCarrito.innerHTML = cantidadItemsEnCarrito.classList = '';
    }

}

// Cambiar SVG menu - Chevron double up/down
function changeSVGMenu(boolean) {
    direction = boolean;
    if (direction) {
        mostrarMenu.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
        `;
    } else {
        mostrarMenu.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
          <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg>
        `;
    }
}

// Mostrar menu en movil
mostrarMenu.onclick = () => {changeDisplay(contenidoMenu), changeSVGMenu(!direction)};

// ---------------------------------------- Llamar funciones

mostrarUsuario();