// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarProductos, mostrarError} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {ofertas} from "../modules/arrays.mjs";
import {main} from "../modules/dom.mjs";

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    mostrarProductos('ofertas', 'Ofertas', ofertas, ofertas.length, main);
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})