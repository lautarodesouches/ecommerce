// ======================================== PRODUCTOS ========================================

// Obtener parametros en url
const queryString   = window.location.search;
const urlParams     = new URLSearchParams(queryString);
// Obtener parametro productId
const productId     = urlParams.get('productId');
// Si no se puede obtener el id del producto, volvera pagina principal
productId === null && (window.location.href = "/");

// ---------------------------------------- Variables

const producto = listaProductos[productId-1]; 

// ---------------------------------------- DOM

const imagenes                  = document.getElementById('imagenes');
const imagenPrincipal           = document.getElementById('imagenPrincipal');
const nombreProducto            = document.getElementById('nombreProducto');
const coloresDisponibles        = document.getElementById('coloresDisponibles');
const descripcion               = document.getElementById('descripcion');
const envioGratis               = document.getElementById('envio-gratis');
const precio                    = document.getElementById('precio');
const cantidadActual            = document.getElementById('cantidadActual');
const seleccionarCantidad       = document.getElementById('seleccionarCantidad');
const liSeleccionarCantidad     = seleccionarCantidad.children[0].getElementsByTagName('li');
const inputSeleccionarCantidad  = seleccionarCantidad.children[0].getElementsByTagName('input');
const disponibles               = document.getElementById('disponibles');
const comprarAhora              = document.getElementById('comprar-ahora');
const agregarCarrito            = document.getElementById('agregar-carrito');

// ---------------------------------------- Funciones

function cambiarImagenesMiniatura() {

    // Limpiar
    imagenes.innerHTML = '';

    // Mostrar cada imagen del producto    
    for (let i = 0; i < producto.imagenesDisponibles; i++) {

        let contenedor = document.createElement('div');
        contenedor.classList = 'col-12 my-2 mh-100 rounded imagen-miniatura p-2';

        // A la primera imagen poner borde azul
        i === 0 && contenedor.classList.add('imagen-miniatura-actual');

        contenedor.innerHTML = `
            <div class="h-30">
                <img src="../${producto.imagen}-${i+1}.png" class="w-75">
            </div>
        `;

        // Cuando se pase el mouse por arriba cambiar imagen principal
        contenedor.onmouseover = () => {

            // Buscar y borrar clase imagen-actual anterior
            const ima = document.getElementsByClassName('imagen-miniatura-actual');
            ima[0].classList.remove('imagen-miniatura-actual');

            // Cambiar imagen principal
            imagenPrincipal.innerHTML = `<img src="../${producto.imagen}-${i+1}.png" class="w-50"></img>`;

            // Asignar clase imagen-actual
            contenedor.classList.add('imagen-miniatura-actual');

        }

        imagenes.appendChild(contenedor);

    }
}

// Cambiar imagen principal
imagenPrincipal.innerHTML = `<img src="../${producto.imagen}-1.png" class="w-50"></img>`;

// Cambiar nombre producto
nombreProducto.innerText = producto.nombre;

// Mostrar colores disponibles
function mostrarColoresDisponibles() {
    coloresDisponibles.innerHTML = '';
    // Por cada color mostrar una opcion
    for (let i = 0; i < producto.coloresDisponibles.length; i++) {
        // Primera letra capitalizada
        let contenedor = document.createElement('div');
        contenedor.classList = 'col-12 col-md-4'; 
        contenedor.innerHTML = `
            <p class="rounded text-white px-3 py-1 mb-4 bg-${producto.coloresDisponibles[i]} cursor">${producto.coloresDisponibles[i].charAt(0).toUpperCase() + producto.coloresDisponibles[i].slice(1)}</p>
        `;

        coloresDisponibles.appendChild(contenedor);
    }
}

// Añadir descripcion
function aniadirDescripcion() {
    let contenedor = document.createElement('p');
    contenedor.classList = 'times';
    contenedor.innerText = producto.descripcion;
    descripcion.appendChild(contenedor);
}

// Mostrar envio gratis
function mostrarEnvio() {
    // Si el producto tiene envio gratis mostrar
    if (producto.envioGratis) {
        let contenedor = document.createElement('h4');
        contenedor.classList = 'text-success'
        contenedor.innerText = 'Envio Gratis!';
        envioGratis.appendChild(contenedor);
    }
}

// Mostrar precio
function mostrarPrecio() {
    precio.innerText = formatearNumero(producto.precio * parseInt(cantidadActual.children[0].innerText));
}

// Cantidad actual
function cambiarCantidadActual(cantidad, arrowDown) {
    
    let arrow = '';

    if (arrowDown) {
        arrow = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
            </svg>
        `;
    }else{
        arrow = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
            </svg>
        `;
    }

    cantidadActual.innerHTML = `
        <span class="h5 pe-3" value="${cantidad}">${cantidad}</span>
        ${arrow}
    `;

    cantidadActual.onclick = () => {

        // Mostrar opciones de cantidad
        changeDisplay(seleccionarCantidad);
        // Cambiar flecha
        cambiarCantidadActual(cantidad, !arrowDown);

    }

}

// Seleccionar cantidad
for (let i = 0; i < liSeleccionarCantidad.length; i++) {
    
    liSeleccionarCantidad[i].onclick = (e) => {
        cambiarCantidadActual(e.target.value, true);
        changeDisplay(seleccionarCantidad);
        mostrarDisponibles();
    }
    
}

// Input en seleccionar cantidad para ingresar cantidad mayor a 5
inputSeleccionarCantidad[0].onblur = inputSeleccionarCantidad[0].keyup = (e) => {
    cambiarCantidadActual(e.target.value, true);
    changeDisplay(seleccionarCantidad);
    mostrarDisponibles();
}

// Mostrar productos disponibles
function mostrarDisponibles() {

    // Limpiar
    disponibles.innerHTML = '';

    let contenedor = document.createElement('span');

    // Si la cantidad a comprar es mayor a la disponible
    if (producto.cantidadDisponible - parseInt(cantidadActual.children[0].innerText) < 0) {
        
        // Poner texto de advertencia
        contenedor.classList = 'text-warning';
        contenedor.innerHTML = `Podes ordenar hasta ${producto.cantidadDisponible}`;

        // Desabilitar botones
        comprarAhora.classList.add('disabled');
        agregarCarrito.classList.add('disabled');

    }else{

        // Si el boton esta deshabilitado, habilitar
        if (comprarAhora.classList[5] === 'disabled') {
            comprarAhora.classList.remove('disabled');
            agregarCarrito.classList.remove('disabled');
        }

        // Calcular disponibles (disponibles del producto menos lo que va a ordenar)
        let disponibles = producto.cantidadDisponible - parseInt(cantidadActual.children[0].innerText);

        // Si el que va a comprar no es el ultimo, mostrar cuantos hay disponibles, si no, mostrar ultimo disponible
        disponibles > 0 ? disponibles = `Disponibles: ${disponibles}` : disponibles = `Último disponible`;

        // Mostrar disponibles en DOM
        contenedor.innerHTML = disponibles;

        // Mostrar precio multiplicado por cantidad a comprar
        mostrarPrecio();

    }

    disponibles.appendChild(contenedor);

}

// Agregar items en carrito y guardar el local storage
function manejarCarrito() {
    
    // Buscar si el producto ya esta en el carrito
    let index = carrito.indexOf(carrito.find( (el) => el.id === producto.id ));

    function sumarCantidades() {
        carrito[index].cantidadComprada += producto.cantidadComprada;
    }

    // Si el producto existe en el carrito, sumar cantidades compradas, si no, agregar nuevo
    index !== -1 ? sumarCantidades() : carrito.push(producto);

    // Restar cantidad comprada a disponible
    producto.cantidadDisponible -= producto.cantidadComprada;

    // Guardar carrito en local storage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar lista productos
    sessionStorage.setItem('productos', JSON.stringify(listaProductos));

}

function botonesComprarYAgregar(e) {

    // Prevenir default
    e.preventDefault();

    producto.cantidadComprada = parseInt(cantidadActual.children[0].innerText);

    // Agregar producto al carrito y almacenarlo en local storage
    manejarCarrito();
    
}

// Boton comprar ahora
comprarAhora.onclick = (e) => {

    botonesComprarYAgregar(e);

    // Redirigir a carrito para finalizar compra
    window.location.href = "/cart";

}

// Boton agregar carrito
agregarCarrito.onclick = (e) => {

    botonesComprarYAgregar(e);

    // Mostrar items en carrito
    itemsEnCarrito();

    // Mostrar cuantos quedan disponibles
    mostrarDisponibles();

    // Notificacion
    Toastify({
    text: `Producto agregado!`,
    style: {
        background: "#0d6efd",
    },
    duration: 1000,
    stopOnFocus: false
    }).showToast();

}

// ---------------------------------------- Llamar funciones

cambiarImagenesMiniatura();
mostrarColoresDisponibles();
aniadirDescripcion();
mostrarEnvio();
mostrarPrecio();
cambiarCantidadActual(1, true);
mostrarDisponibles();
itemsEnCarrito();