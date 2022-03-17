// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarError, mostrarCategoria, mostrarMarca, correrBusqueda} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {copiaTodosLosProductos} from "../modules/arrays.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    correrBusqueda();
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})