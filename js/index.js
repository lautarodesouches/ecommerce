// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarProductos, mostrarBanners, mostrarError} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {productosRecomendados, productosDestacados, ofertas} from "../modules/arrays.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    mostrarBanners(main);
    mostrarProductos('productos-recomendados', 'Productos Recomendados', productosRecomendados, 4, main);
    mostrarProductos('productos-destacados', 'Productos Destacados', productosDestacados, 4, main);
    mostrarProductos('ofertas', 'Ofertas', ofertas, 4, main);
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})