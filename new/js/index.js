// ---------------------------------------- Import

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Funciones

function mostrarBanners() {

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
    main.appendChild(section);
    
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

function mostrarProductosRecomendados() {
    
    let section = document.createElement('section');
    section.classList = 'py-3 container text-center';
    section.id = 'productos-recomendados';
    section.innerHTML = `
        <h2>Productos Recomendados</h2>
        <section class="row align-items-center justify-content-center mt-4">
        </section>
    `;

    for (let index = 0; index < 4; index++) {

        let article = document.createElement('article');
        article.classList = 'col-12 col-md-3 p-2';
        article.innerHTML = `
            <div class="rounded border bg-white p-3">
                <img src="img/1-1.png" alt="" class="w-75">
                <hr class="w-100">
                <h3>Titulo</h3>
                <h5>${index}</h5>
                <h5 class="text-success">Envío Gratis!</h5>
            </div>
        `;

        section.children[1].appendChild(article)
    }
    
    main.appendChild(section);

}

function mostrarProductosDestacados() {

    let section = document.createElement('section');
    section.classList = 'py-3 container text-center';
    section.id = 'productos-destacados';
    section.innerHTML = `
        <h2>Productos Destacados</h2>
        <section class="row align-items-center justify-content-center mt-4">
        </section>
    `;

    for (let index = 0; index < 4; index++) {

        let article = document.createElement('article');
        article.classList = 'col-12 col-md-3 p-2';
        article.innerHTML = `
            <div class="rounded border bg-white p-3">
                <img src="img/1-1.png" alt="" class="w-75">
                <hr class="w-100">
                <h3>Titulo</h3>
                <h5>${index}</h5>
                <h5 class="text-success">Envío Gratis!</h5>
            </div>
        `;

        section.children[1].appendChild(article)
    }
    
    main.appendChild(section);

}

function mostrarOfertas() {

    let section = document.createElement('section');
    section.classList = 'py-3 container text-center';
    section.id = 'ofertas';
    section.innerHTML = `
        <h2>Ofertas</h2>
        <section class="row align-items-center justify-content-center mt-4">
        </section>
    `;

    for (let index = 0; index < 4; index++) {

        let article = document.createElement('article');
        article.classList = 'col-12 col-md-3 p-2';
        article.innerHTML = `
            <div class="rounded border bg-white p-3">
                <img src="img/1-1.png" alt="" class="w-75">
                <hr class="w-100">
                <h3>Titulo</h3>
                <h5>${index}</h5>
                <h5 class="text-success">Envío Gratis!</h5>
            </div>
        `;

        section.children[1].appendChild(article)
    }
    
    main.appendChild(section);

}

// ---------------------------------------- Ejecutar funciones

showMenu();
showFooter();
mostrarBanners();
mostrarProductosRecomendados();
mostrarProductosDestacados();
mostrarOfertas();