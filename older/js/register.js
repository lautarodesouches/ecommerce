// ======================================== REGISTER ========================================

// Si el usuario ya esta logeado, redirigir a login para que pueda cerrar sesion
usuarioLog && (window.location.href = '../login');

// ---------------------------------------- Variables

const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];

let nombre      = '';
let email       = '';
let password    = '';
let password2   = '';
let todoValido  = true;

// ---------------------------------------- DOM

const main              = document.getElementById('main');
const form              = document.getElementsByTagName('form');
const inputNombre       = document.getElementById('name');
const inputEmail        = document.getElementById('email');
const inputPassword     = document.getElementById('password');
const inputPassword2    = document.getElementById('password2');

// ---------------------------------------- Funciones

// Verificar que los campos se encuentren llenos
function erroresFalsy() {

    nombre      || errorNombre();
    email       || errorEmail();
    password    || errorPassword();
    password2   || errorPassword2();

}

// Validar constraseña
function validarPassword() {
    return password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/);
}

// Buscar email en usuarios
function buscarEmailEnUsuarios() {

    if (usuarios.some( (el) => el.email === email)) {

        // Cambiar estado
        todoValido = false;

        // Mostrar borde rojo
        errorEmail();
        
        // Mostrar mensaje
        form[1].children[1].children[2].classList.remove('d-none');

    }

}

// Si hay error poner borde rojo, vaciar campo y cambiar estatus todoValido
const errorNombre       = () => { inputNombre.classList.add('border-danger'); inputNombre.value = ''; todoValido = false}
const errorEmail        = () => { inputEmail.classList.add('border-danger'); inputEmail.value = ''; todoValido = false }
const errorPassword     = () => { inputPassword.classList.add('border-danger'); inputPassword.value = ''; todoValido = false }
const errorPassword2    = () => { inputPassword2.classList.add('border-danger'); inputPassword2.value = ''; todoValido = false }

// Si se cambia el valor del input remover borde rojo
inputNombre.onchange    = () => { inputNombre.classList.remove('border-danger'); }
inputEmail.onchange     = () => { inputEmail.classList.remove('border-danger'); }
inputPassword.onchange  = () => { inputPassword.classList.remove('border-danger'); }
inputPassword2.onchange = () => { inputPassword2.classList.remove('border-danger'); }

function mensajeExito() {
    
    // Limpiar
    main.innerHTML = '';
    
    let contenedor = document.createElement('div')
    contenedor.classList.add('text-center')
    contenedor.innerHTML = `
    <h5 class="my-4">Usuario registrado exitosamente</h5>  
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
    <a href="../" class="text-dark text-decoration-none">
        <div class="text-center mt-5">
            <button class="btn btn-primary w-50">Continuar</button>
        </div>
    </a>
    `;

    main.appendChild(contenedor)

}

function restaurarVariables() {
    nombre      = '';
    email       = '';
    password    = '';
    password2   = '';
    todoValido  = true;
}

// Forma de registro
form[1].onsubmit = (e) => {

    // Prevenir recargar pagina
    e.preventDefault()

    // Valor inicial
    todoValido = true;

    // Asignar valores
    nombre      = inputNombre.value;
    email       = inputEmail.value;
    password    = inputPassword.value;
    password2   = inputPassword2.value;

    // Buscar errores falsy
    erroresFalsy();

    // Validar
    validarPassword() || errorPassword();

    // Contraseñas son iguales remover mensaje de error si hay, si no hacer mensaje visible y mostrar borde rojo
    password === password2 ? form[1].children[3].children[2].classList.add('d-none') : (form[1].children[3].children[2].classList.remove('d-none'), errorPassword2() );

    // Ver que email no este registrado
    buscarEmailEnUsuarios();

    // Si todo es valido
    if (todoValido) {
        // Agregar nuevo usuario
        usuarios.push( new Usuario(nombre, email, password) );
        // Almacenar usuario en local storage
        localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
        // Mensaje de exito
        mensajeExito();
    }

    restaurarVariables();

}