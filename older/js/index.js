// ======================================== RESPONSIVE ========================================

// ---------------------------------------- DOM

const limit_size_screen = window.matchMedia('screen and (max-width: 768px)');

// ---------------------------------------- Funciones

// Verificar si el tamaño de la pantalla es menor a 768
limit_size_screen.matches ? window.location.replace('mobile.html') : window.location.replace('desktop.html');

// ---------------------------------------- Eventos

// Si el tamaño de la pantalla cambia, recargar página
limit_size_screen.onchange = () => {location.reload()};