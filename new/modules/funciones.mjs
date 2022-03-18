// ---------------------------------------- Importar

import {urlProducto, urlCarpetaImg, urlInicio, urlBuscador} from "../modules/urls.mjs";
import {todosLosProductos, copiaTodosLosProductos} from "../modules/arrays.mjs";

// ---------------------------------------- Exportar

export function formatearNumero(numero) {
  let formatoNumero = new Intl.NumberFormat('es-AR');
  return '$' + formatoNumero.format(numero);
}

export function mostrarBanners(lugar) {

    let section = document.createElement('section');
    section.id = 'banners';
    section.innerHTML = `
    <!-- Slider main container -->
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">
            <img src="img/primerBanner.png" alt="50% de descuento en consolas y videojuegos">
        </div>
        <div class="swiper-slide segundo-banner">
            <img src="img/segundoBanner.png" alt="Las mejores notebooks en un solo lugar">
        </div>
        <div class="swiper-slide">
            <img src="img/tercerBanner.jpg" alt="necesitamos diseñador gráfico">
        </div>
      </div>
      <!-- Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    `;

    lugar.appendChild(section);
    
    // Iniciar swiper
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
    
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        autoplay: {
          delay: 5000,
        },
    });
    
}

export function mostrarProductos(id, titulo, array, cantidad, dom) {
    
  let section = document.createElement('section');
  section.classList = 'container text-center mh-500 py-3';
  section.id = id;
  section.innerHTML = `
    <h2>${titulo}</h2>
    <section class="row align-items-start justify-content-center mt-4">
    </section>
  `;

  // Si la cantidad requerida es mayor al array, usar array
  cantidad > array.length && (cantidad = array.length);

  for (let i = 0; i < cantidad; i++) {

    // Variable para mostrar envio gratis
    let h5EnvioGratis = '';
    // Variable para saber donde esta el texto oculto que se va a mostrar luego
    let numeroChildren = 3;

    // Si hay envio gratis cambiar variable y sumar 
    array[i].envioGratis && (h5EnvioGratis = '<h5 class="text-success">Envío Gratis!</h5>', numeroChildren++);

    let article = document.createElement('article');
    article.classList = 'col-12 col-md-3 p-2 articulo';
    article.innerHTML = `
      <div class="rounded border bg-white p-3 articulo-principal">
        <div class="contenedor-img">
          <img src="${`${urlCarpetaImg}${array[i].id}-1.png`}" alt="${array[i].nombre}">
        </div>
        <hr class="w-100">
        <h5>${formatearNumero(array[i].precio)}</h5>
        ${h5EnvioGratis}
        <h5 class="d-md-none" id="${array[i].id}">${array[i].nombre}</h5>
      </div>
    `;

    section.children[1].appendChild(article);

    // Eventos
    article.children[0].onmouseover = () => {article.children[0].children[numeroChildren].classList.toggle('d-md-none')};
    article.children[0].onmouseout = () => {article.children[0].children[numeroChildren].classList.toggle('d-md-none')};

    // Redirigir a pagina del producto
    article.onclick = () => {window.location.href = `${urlProducto}?id=${array[i].id}`};
      
  }
  
  dom.appendChild(section);

}

export function mostrarError(main, error) {

  // Limpiar DOM
  main.innerHTML = '';

  let section = document.createElement('section');
  section.classList = 'text-center mh-700 pt-5';
  section.innerHTML = `
    <h1>Ha ocurrido un error</h1>
    <h5 class="pt-5">Por favor intente mas tarde</h5>
    <p>Si el problema persiste, por favor comuniquese con el administrador</p>
    <p class="pt-5">${error}</p>
  `;

  main.appendChild(section);

}

export function mostrarCategorias(dom, array) {

  dom.innerHTML = '';

  let section = document.createElement('section');
  section.classList = 'container';

  let div = document.createElement('div');
  div.classList = 'row align-items-center justify-content-center text-center';

  array.forEach(element => {

    let article = document.createElement('article');
    article.classList = 'col-12 col-md-4 p-3';
    article.innerHTML = `
      <div class="bg-white px-2 py-4 rounded border categoria">
          <h5>${element}</h5>
      </div>
    `;

    article.onclick = () => {
      sessionStorage.setItem('categorias', element);
      window.location.href = `${urlBuscador}?categoria=${element}`;
    }

    div.appendChild(article);

  });

  section.appendChild(div);

  dom.appendChild(section);
  
}

export function obtenerCategorias() {

  let listaCategorias = [];

  // Recorro todos los productos
  todosLosProductos.forEach(element => {
    // Si el producto no se encuentra en la lista de productos lo agrego
    listaCategorias.indexOf(element.categoria) === -1 && listaCategorias.push(element.categoria);
  });

  return listaCategorias;

}

export function noHayFavoritos(dom) {

  let section = document.createElement('section');
  section.classList = 'text-center mt-5';
  section.innerHTML = `
  <div class="my-5">
      <h3>No se encontraron favoritos agregados!</h3>
      <h5>Podés agregar productos a favoritos para poder verlos o comprarlos más tarde.</h5>
  </div>
  <a href="${urlInicio}">
      <h3>Empezá a buscar productos para agregar acá</h3>
  </a>
  `;
  
  dom.appendChild(section);

}

export function copiarArray(arrayDeseado, arrayDestino) {
  // Limpiar
  arrayDestino.splice(0, arrayDestino.length);
  // Por cada elemento del array deseado, mandar a destino
  arrayDeseado.forEach(element => {
      arrayDestino.push(element)
  });
}

function agregarParrafoFiltro(idDOM, nombre, cantidad) {

  // DOM
  const dom = document.getElementById(idDOM);

  // Crear parrafo
  let p = document.createElement('p');
  p.classList = 'm-1';
  p.innerHTML = `
  <a class="text-decoration-none text-dark">${nombre} <span class="text-secondary">(${cantidad})</span></a>
  `;

  p.onclick = () => {
    // Actualizar filtro en storage
    sessionStorage.setItem(idDOM, nombre);
    // Recargar pagina
    recargar();
  }

  // Agregarlo
  dom.appendChild(p);

}

export function mostrarCategoria(copiaTodosLosProductos) {

  // Ordenar por categoria
  copiaTodosLosProductos.sort((a, b) => {
    if (a.categoria > b.categoria) {
        return 1;
    }
    if (a.categoria < b.categoria) {
        return -1;
    }
    // a es igual a b
    return 0;
  })

  let contador = 0;

  // Copiar categorias a array
  for (let i = 0; i < copiaTodosLosProductos.length; i++) {

    // Contar un producto mas de la categoria
    contador++;

    // Si es el ultimo numero del array o si el nombre de la categoria actual es diferente a la siguiente, agregar
    if (i === (copiaTodosLosProductos.length - 1) || (copiaTodosLosProductos[i].categoria !== copiaTodosLosProductos[i+1].categoria)) {
      
      agregarParrafoFiltro('categorias', copiaTodosLosProductos[i].categoria, contador);
      contador = 0;

    }
  }

}

export function mostrarMarca(copiaTodosLosProductos) {

  // Ordenar por marca
  copiaTodosLosProductos.sort((a, b) => {
    if (a.marca > b.marca) {
        return 1;
    }
    if (a.marca < b.marca) {
        return -1;
    }
    // a es igual a b
    return 0;
  })

  let contador = 0;

  // Copiar categorias a array
  for (let i = 0; i < copiaTodosLosProductos.length; i++) {

    // Contar un producto mas de la categoria
    contador++;

    // Si es el ultimo numero del array o si el nombre de la categoria actual es diferente a la siguiente, agregar
    if (i === (copiaTodosLosProductos.length - 1) || (copiaTodosLosProductos[i].marca !== copiaTodosLosProductos[i+1].marca)) {
      
      agregarParrafoFiltro('marcas', copiaTodosLosProductos[i].marca, contador);
      contador = 0;

    }
  }

}

export function mostrarFiltrosActivos(dom) {
  
  // DOM
  const filtrosActivos = document.getElementById(dom);
  const divFiltros     = filtrosActivos.children[1];

  // Limpiar filtros
  divFiltros.innerHTML = '';

  // Variables
  let busqueda = sessionStorage.getItem('busqueda');
  let categorias = sessionStorage.getItem('categorias');
  let marcas = sessionStorage.getItem('marcas');

  // Si hay algun filtro, mostrar seccion
  if (busqueda || categorias || marcas) {
    filtrosActivos.classList.remove('d-none');
  }else{
    filtrosActivos.classList.add('d-none');
  }

  // Si hay un filtro de busqueda, mostrar
  busqueda && mostrarFiltro(busqueda, 'busqueda', divFiltros);

  // Si hay un filtro de categoria, mostrar
  categorias && mostrarFiltro(categorias, 'categorias', divFiltros);

  // Si hay un filtro de marca, mostrar
  marcas && mostrarFiltro(marcas, 'marcas', divFiltros);

}

function mostrarFiltro(valor, remover, dom) {

  let div = document.createElement('div');
  div.classList = 'col-auto bg-primary rounded px-4 py-1 m-1 position-relative';
  div.innerHTML = `
    <a class="text-decoration-none text-white">${valor}<span class="cross">x</span></a>
  `;

  div.onclick = () => {
    sessionStorage.removeItem(remover);
    recargar();
  }

  dom.appendChild(div);

}

function recargar() {
  correrBusqueda();
}

export function correrBusqueda() {

  // Dom - ubicar donde poner los productos
  const resultadosDOM = document.getElementById('resultados');

  // Copiar array original
  copiarArray(todosLosProductos, copiaTodosLosProductos);

  // Mostrar filtros activos
  mostrarFiltrosActivos('filtros-activos');

  // Almacenar resultados del filtrado
  const arrayFiltrado = aplicarFiltros(copiaTodosLosProductos);

  // Limpiar
  limpiar('categorias');
  limpiar('marcas');
  limpiar('resultados');

  // Manejar opciones orden
  opcionesOrden();

  // Ordenar
  ordenar(arrayFiltrado);

  // Mostrar productos encontrados, si no hay, mostrar no se encontraron
  arrayFiltrado.length > 0 ? mostrarProductos('resultados','Resultados', arrayFiltrado, arrayFiltrado.length, resultadosDOM) : resultadosDOM.innerHTML = `<h3 class="text-center pt-5">No se encontraron resultados</h3>`;

  // Mostrar categorias para filtrar
  mostrarCategoria(arrayFiltrado);
  
  // Mostrar marcas para filtrar
  mostrarMarca(arrayFiltrado);

}

function aplicarFiltros(copiaTodosLosProductos) {

  // Variables
  let busqueda = sessionStorage.getItem('busqueda') || '';
  let categorias = sessionStorage.getItem('categorias') || '';
  let marcas = sessionStorage.getItem('marcas') || '';

  busqueda = busqueda.toLowerCase();

  // Filtrar
  copiaTodosLosProductos = copiaTodosLosProductos.filter((el) => el.nombre.toLowerCase().includes(busqueda) || el.categoria.toLowerCase().includes(busqueda) || el.marca.toLowerCase().includes(busqueda));
  copiaTodosLosProductos = copiaTodosLosProductos.filter((el) => el.categoria.includes(categorias));
  copiaTodosLosProductos = copiaTodosLosProductos.filter((el) => el.marca.includes(marcas));

  return copiaTodosLosProductos;

}

function limpiar(idElemento) {
  const dom = document.getElementById(idElemento);
  dom.innerHTML = '';
}

function ordenarMenorPrecio(arrayAOrdenar) {
  arrayAOrdenar.sort((a, b) => a.precio - b.precio);
}

function ordenarMayorPrecio(arrayAOrdenar) {
  arrayAOrdenar.sort((a, b) => b.precio - a.precio);
}

function ordenarRandom(arrayAOrdenar) {
  arrayAOrdenar.sort(() => Math.random(1) - Math.random(1));
}

function ordenar(arrayAOrdenar) {

  let orden = sessionStorage.getItem('orden');

  orden === 'Menor Precio' && ordenarMenorPrecio(arrayAOrdenar);
  orden === 'Mayor Precio' && ordenarMayorPrecio(arrayAOrdenar);
  (orden === 'Random' || orden === null) && ordenarRandom(arrayAOrdenar);
  
}

function opcionesOrden() {
  
  const ordenActual = document.getElementById('abrirOpcionesOrden');
  const contenedorOpciones = document.getElementById('opcionesOrden');
  const listaOpciones = contenedorOpciones.children[0].children;

  // Poner valor actual
  ordenActual.children[0].innerText = sessionStorage.getItem('orden');

  // Mostrar opciones de orden
  ordenActual.onclick = () => {contenedorOpciones.classList.toggle('d-none')};

  // Por cada orden listado
  for (let i = 0; i < listaOpciones.length; i++) {
    listaOpciones[i].onclick = () => {
      // Cambiar opcion orden en storage
      sessionStorage.setItem('orden', listaOpciones[i].innerText);
      // Correr busqueda para actualizar
      correrBusqueda();
      // Cerrar lista
      contenedorOpciones.classList.toggle('d-none');
      // Cambiar orden actual
      ordenActual.children[0].innerText = listaOpciones[i].innerText;
    }
  }

}