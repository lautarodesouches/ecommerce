// ======================================== CARRITO ========================================

// Avisar si el carrito se encuentra vacio
function chequearCarrito() {
    if (carrito.length === 0) {
        carritoVacio()
    }else{
        mostrarCarrito();
    }
}

// Vaciar el carrito
function vaciarCarrito(){

    // Vaciar array
    carrito.splice(0, carrito.length);

    // Eliminar datos storage
    localStorage.removeItem('carrito');

}

// Calcular total envio del carrito
const costoDeEnvio = 500;
function calcularCostoDeEnvio() {
    
    // Inicializo variable para almacenar el total
    let totalEnvio = 0;

    // Recorro el carrito
    for (let i = 0; i < carrito.length; i++) {
        
        // Si no tiene envio gratis sumar costo de envio al total
        if (!carrito[i].envioGratis) {
            totalEnvio += costoDeEnvio
        }

    }

    // Devuelvo el total
    return totalEnvio

}

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- Calcular total carrito
function calcularTotalCarrito() {

    // Inicializo variable para almacenar el total
    let totalCarrito = 0;
    
    // Sumo el costo de envio mas el precio multiplicado por la cantidad de productos comprados
    totalCarrito += calcularCostoDeEnvio() + carrito.reduce((acc, el) => acc + (el.precio * el.cantidadComprada ), 0);

    // Devuelvo el total
    return totalCarrito;
}

/*
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- Pagar
function pagar() {
}

function pagarConDebito() {
    vaciarCarrito();
    let pagoExitoso = true;
    mensajeEstadoDePago(pagoExitoso);
}

function pagarConCredito() {

    let pagoExitoso = false;
    let interesAnual = 50;
    let cuotasSeleccionadas;
    let mensaje = `Tenes ${carrito[0].cantidadCuotasSinInteres} cuotas sin interes \n Ingresa el numero de cuotas deseadas \n El interes anual para las cuotas con interes es del ${interesAnual}%`;

    function pedirCuotasYProcesarPago() {
        
        cuotasSeleccionadas = prompt(mensaje);
        alert('Son ' + cuotasSeleccionadas + ' con un valor de ' + formatearNumero(calcularCuotas(cuotasSeleccionadas, interesAnual) / cuotasSeleccionadas) + ' cada una | Costo total = ' + formatearNumero(calcularCuotas(cuotasSeleccionadas, interesAnual)));
        if(prompt('1- Para aceptar\n2- Para cancelar') == '1'){
            pagoExitoso = true;
            vaciarCarrito();
        }
    }

    if( carrito.length > 1 && carrito.some( (el) => el.cantidadCuotasSinInteres > 1) ){
        if(carrito.every( (el) => el.cantidadCuotasSinInteres === carrito[0].cantidadCuotasSinInteres)){
            alert('Tenes la misma cantidad de cuotas sin interes disponibles en todos tus productos');
            pedirCuotasYProcesarPago();
        }else{
            alert('Las cuotas sin interes de los productos de tu carrito son distintas, dividiremos tus pagos para un mejor procesamiento. Mostraremos el pago con credito al primer producto de tu carrito');
            if(carrito[0].cantidadCuotasSinInteres > 1){
                pedirCuotasYProcesarPago();
            }
        }
    }else if(carrito[0].cantidadCuotasSinInteres > 1){
        pedirCuotasYProcesarPago();
    }else{
        pedirCuotasYProcesarPago();
    }

    mensajeEstadoDePago(pagoExitoso);
}

function calcularCuotas(numeroDeCuotas, interesAnual) {
    let total = 0;
    let costoDeEnvio = 0;

    if(!carrito[0].envioGratis){costoDeEnvio = 500}

    if(carrito[0].cantidadCuotasSinInteres >= numeroDeCuotas){
        interesAnual = 0;
    }
    
    total = (carrito[0].precio + costoDeEnvio) + ((carrito[0].precio + costoDeEnvio) * interesAnual / 100);
    return total;
}

function mensajeEstadoDePago(estadoDePago) {
    if(estadoDePago){
        alert('Pago realizado exitosamente, gracias por tu compra!');
        return opcion = '9';
    }else{
        alert('El pago no se pudo realizar correctamente');
    }
}

*/

const lugarCarrito = document.getElementById('carrito');

function mostrarCarrito() {

    lugarCarrito.innerHTML = '';
    
    for (const iterator of carrito) {
    
        let productoEnCarrito = document.createElement('div');
        productoEnCarrito.className = 'row align-items-center justify-content-center my-md-4';
        productoEnCarrito.id = iterator.id;
        productoEnCarrito.innerHTML = `
            <div class="col-12 col-md-2 d-md-none mb-3 text-end pe-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="darkred" class="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            <div class="col-12 col-md-2">
                <img src="../${iterator.imagen}-1.png" class="w-50-25">
            </div>
            <div class="col-12 col-md-3 my-4 my-md-0">
                <h5 class="m-0 arial">${iterator.nombre}</h5>
            </div>
            <div class="col-12 col-md-2 d-none d-md-block">
                <a href="" class="text-primary text-decoration-none">
                    <p class="m-0 trebuchet">Eliminar</p>
                </a>
            </div>
            <div class="col-12 col-md-2 times">
                <p class="text-secondary">Cantidad</p>
                <h5 class="m-0">${iterator.cantidadComprada}</h5>
            </div>
            <div class="col-12 col-md-3 times mt-4 mt-md-0">
                <p class="text-secondary">Subtotal</p>
                <h5 class="m-0">${formatearNumero(iterator.precio * iterator.cantidadComprada)}</h5>
            </div>
            <hr class="w-75 bg-secondary my-5">
        `;

        lugarCarrito.appendChild(productoEnCarrito);

        function eliminar() {

            // Borrar item del array carrito
            carrito.splice(carrito.indexOf(iterator), 1);
        
            // Pasar carrito a JSON
            carritoJSON = JSON.stringify(carrito)
        
            // Actualizar carrito en local storage
            localStorage.setItem('carrito', carritoJSON)

            // Buscar index listaProductos de producto
            let index = listaProductos.indexOf( listaProductos.find( (el) => el.id === iterator.id ) );

            // Restaurar cantidad disponible
            listaProductos[index].cantidadDisponible += listaProductos[index].cantidadComprada;

            // Restaurar cantidad comprada
            listaProductos[index].cantidadComprada = 0;

            // Actualizar lista productos en session storage
            sessionStorage.setItem('productos', JSON.stringify(listaProductos));
        
            // Actualizar
            itemsEnCarrito();
            chequearCarrito();
        
        }

        // Primer botone eliminar
        productoEnCarrito.children[0].children[0].onclick = (e) => { e.preventDefault(); eliminar(); }

        // Segundo boton eliminar
        productoEnCarrito.children[3].children[0].onclick = (e) => { e.preventDefault(); eliminar(); }
        
    }

    let mostrarTotal = document.createElement('div')
    mostrarTotal.innerHTML = `
        <div class="row align-items-center justify-content-center mt-md-3 pt-3 times">
            <div class="col-12 col-md-4">
                <h5>Total:</h5>
            </div>
            <div class="col-12 col-md-4">
                <h5>${formatearNumero(calcularTotalCarrito())}</h5>
            </div>
        </div>
        <a href="../cart/checkout/" id="finalizar">
            <button class="btn btn-lg btn-primary w-75 mt-5">Pasar a pago</button>
        </a>
    ` 

    lugarCarrito.appendChild(mostrarTotal);

}

function carritoVacio() {

    lugarCarrito.classList.remove('p-3') 
    lugarCarrito.classList.add('p-0')
    lugarCarrito.innerHTML = '<h1 class="bg-white p-3">El carrito se encuentra vacio</h1><img src="../img/tumbleweed-acegif-26.gif" class="w-100">'

}


// ------------------------------------------ LLAMAR FUNCIONES

itemsEnCarrito();
chequearCarrito();