// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarCarrito, mostrarError} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    mostrarCarrito(main)
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})