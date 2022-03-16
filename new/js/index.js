// ---------------------------------------- Import

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarProductosEnPaginaPrincipal, mostrarBanners, mostrarError} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {productosRecomendados, productosDestacados, ofertas} from "../modules/arrays.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    showMenu();
    showFooter();
    mostrarBanners(main);
    mostrarProductosEnPaginaPrincipal('productos-recomendados', 'Productos Recomendados', productosRecomendados, main);
    mostrarProductosEnPaginaPrincipal('productos-destacados', 'Productos Destacados', productosDestacados, main);
    mostrarProductosEnPaginaPrincipal('ofertas', 'Ofertas', ofertas, main);
} )
.catch( (res) => {
    showMenu();
    mostrarError(main, res);
    showFooter();
} );