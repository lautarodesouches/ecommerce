// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {procesarPago} from "../modules/promesas.mjs";
import {borrarCarritoYCargarMenu} from "../modules/funciones.mjs";
import {urlInicio} from "../modules/urls.mjs";
import {carrito} from "../modules/arrays.mjs";

// ---------------------------------------- DOM

const container = document.getElementsByTagName('main')[0].children[0].children[0].children[0];
const form = document.getElementsByTagName('form')[0];

// ---------------------------------------- Evento

form.onsubmit = (e) => {

    e.preventDefault();

    container.innerHTML = `
        <h5>Cargando</h5>
    `;

    // Tomar mes vencimiento del formulario
    let expirationMonth = form.children[2].children[0].children[0].children[1].children[0].value;
    // Tomar año vencimiento del formulario
    let expirationYear = form.children[2].children[0].children[0].children[1].children[1].value;

    procesarPago(container, expirationMonth, expirationYear)
    .then( (value) => {
        // Mostrar mensaje
        value;
        // Borrar carrito
        borrarCarritoYCargarMenu();
    })
    .catch( (error) => {
        // Mostrar mensaje
        error
    })

}

// ---------------------------------------- Funciones

// Mostrar menu
showMenu();

// Mostrar footer
showFooter();

// Si el carrito esta vacio redirigir a inicio
carrito.length < 1 && (window.location.href = urlInicio);