// ======================================== CHECKOUT ========================================

// ---------------------------------------- Variables

// ---------------------------------------- DOM

const main = document.getElementById('main');

// ---------------------------------------- Funciones

function mensajeExito() {
    
    // Limpiar
    main.innerHTML = '';
    
    let contenedor = document.createElement('div');
    contenedor.classList.add('text-center');
    contenedor.innerHTML = `
    <h5 class="my-4">La compra se ha procesado correctamente!</h5>  
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
    <a href="../../" class="text-dark text-decoration-none">
        <div class="text-center my-3">
            <button class="btn btn-primary w-50">Volver a Inicio</button>
        </div>
    </a>
    `;

    main.appendChild(contenedor);

}

// Si hay usuario
if (usuarioLog) {

    main.innerHTML = `
        <form class="p-3">
            <div class="mb-3">
                <label for="cardNumber" class="form-label"><b>Número de tarjeta</b></label>
                <input type="text" class="form-control" id="cardNumber" aria-describedby="numero tarjeta" required="">
            </div>
            <div class="mb-3">
                <label for="cardName" class="form-label"><b>Nombre</b></label>
                <input type="text" class="form-control" id="cardName" aria-describedby="nombre en tarjeta" required="">
                <div class="form-text">Nombre como aparece en la tarjeta.</div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="mb-3">
                        <label for="cardDate" class="form-label"><b>Vencimiento</b></label>
                        <div class="input-group">
                            <input id="cardMonth" type="text" class="form-control" placeholder="MM" aria-describedby="mes" pattern="^(0[1-9])|(1[0-2])$" maxlength="2" required="">
                            <input id="cardYear" type="text" class="form-control" placeholder="AA" aria-describedby="año" pattern="^([0-9][0-9])$" maxlength="2" required="">
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="mb-3">
                        <label for="cardSN" class="form-label"><b>Código de Seguridad</b></label>
                        <input type="text" class="form-control" id="cardName" aria-describedby="codigo de seguridad" pattern="^([0-9][0-9][0-9])$" maxlength="3" required="">
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">Finalizar compra</button>
            </div>
        </form>
    `;

    const form = document.getElementsByTagName('form')
    form[1].onsubmit = (e) => {
        
        e.preventDefault();
        
        localStorage.removeItem('carrito');

        mensajeExito();

        itemsEnCarrito();

    }

// Si no hay usuario
}else{

    main.innerHTML = `
    <div class="bg-white p-3 rounded">
        <h5 class="arial">Tenes que iniciar sesión o registrarte para poder finalizar la compra</h5>
        <div class="row text-center mt-4">
            <div class="col-6 my-2 my-md-0">
                <a href="../../register/">
                    <button class="btn btn-primary">Registrarme</button>
                </a>
            </div>
            <div class="col-6 my-2 my-md-0">
                <a href="../../login/">
                    <button class="btn btn-primary">Iniciar sesión</button>
                </a>
            </div>
        </div>
    </div>
    `;

}

// ---------------------------------------- Llamar funciones

itemsEnCarrito();