// ---------------------------------------- Import

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Variables

// ---------------------------------------- Funciones

function agregarBanners() {

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
          delay: 4000,
        },
    });
    
}

// ---------------------------------------- Ejecutar funciones

showMenu();
showFooter();
agregarBanners();