import {urlProductos} from "../modules/urls.mjs";

export function formatearNumero(numero) {

  let formatoNumero       = new Intl.NumberFormat('es-AR');

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

export function mostrarProductosEnPaginaPrincipal(id, titulo, array, dom) {
    
    let section = document.createElement('section');
    section.classList = 'container text-center mh-500 my-3';
    section.id = id;
    section.innerHTML = `
        <h2>${titulo}</h2>
        <section class="row align-items-start justify-content-center mt-4">
        </section>
    `;

    for (let i = 0; i < array.length; i++) {

        let article = document.createElement('article');
        article.classList = 'col-12 col-md-3 p-2';
        article.innerHTML = `
          <div class="rounded border bg-white p-3 articulo-principal">
            <div class="contenedor-img">
              <img src="img/${array[i].id}-1.png" alt="${array[i].nombre}">
            </div>
            <hr class="w-100">
            <h5>${formatearNumero(array[i].precio)}</h5>
            <h5 class="d-md-none" id="${array[i].id}">${array[i].nombre}</h5>
          </div>
        `;

        if (array[i].envioGratis) {
          
          let h5 = document.createElement('h5');
          h5.classList = 'text-success';
          h5.innerText = 'Envío Gratis!';

          article.children[0].appendChild(h5)

        }

        section.children[1].appendChild(article);

        article.onmouseover = () => {article.children[0].children[3].classList.toggle('d-md-none')};
        article.onmouseout = () => {article.children[0].children[3].classList.toggle('d-md-none')};

        article.onclick = () => {window.location.href = `${urlProductos}?id=${array[i].id}`};
        
    }
    
    dom.appendChild(section);

}

export function mostrarError(main, error) {

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