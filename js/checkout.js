// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {procesarPago} from "../modules/promesas.mjs";
import {borrarCarritoYCargarMenu} from "../modules/funciones.mjs";
import {urlInicio} from "../modules/urls.mjs";
import {carrito} from "../modules/arrays.mjs";
import {main} from "../modules/dom.mjs";

// ---------------------------------------- DOM

const container = main.children[0];
const form = document.getElementsByTagName('form')[0];

// ---------------------------------------- Evento

console.log(form.children[0].children[0].children[2].children[0].children[0].children[1].children[0]);

form.onsubmit = (e) => {

    e.preventDefault();

    // Tomar mes vencimiento del formulario
    const expirationMonth = document.getElementById('cardMonth').value;
    // Tomar año vencimiento del formulario
    const expirationYear = document.getElementById('cardYear').value;

    container.innerHTML = `
        <h5>Procesando</h5>
    `;

    procesarPago(container, expirationMonth, expirationYear)
    .then( (value) => {
        // Mostrar mensaje
        value;
        // Borrar carrito
        borrarCarritoYCargarMenu();
    })
    .catch( (error) => {
        // Mostrar mensaje
        error;
    })

}

// ---------------------------------------- Funciones

// Mostrar menu
showMenu();

// Mostrar footer
showFooter();

// Si el carrito esta vacio redirigir a inicio
carrito.length < 1 && (window.location.href = urlInicio);