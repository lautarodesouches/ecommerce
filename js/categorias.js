// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarCategorias, mostrarError, obtenerCategorias} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {main} from "../modules/dom.mjs";

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