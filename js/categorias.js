// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarCategorias, mostrarError, obtenerCategorias} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    mostrarCategorias(main, obtenerCategorias());
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})