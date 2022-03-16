import {todosLosProductos, productosRecomendados, productosDestacados, ofertas} from "../modules/arrays.mjs";

export const cargarProductos = async () => {

    const resultado = await fetch('json/productos.json');
    const respuesta = await resultado.json();
    respuesta.forEach(producto => {

        todosLosProductos.push(producto);

        (producto.categoria === 'Consolas' && productosRecomendados.length < 4) && productosRecomendados.push(producto);

        (producto.categoria === 'Celulares' && productosDestacados.length < 4 ) && productosDestacados.push(producto);

        (producto.categoria === 'Notebooks' && ofertas.length < 4 ) && ofertas.push(producto);

    });

}