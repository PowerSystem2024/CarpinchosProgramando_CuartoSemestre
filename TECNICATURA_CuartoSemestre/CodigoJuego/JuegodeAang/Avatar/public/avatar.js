// Variables globales del estado del juego
let ataqueJugador;
let ataqueEnemigo;
let vidaJugador = 3;
let vidaEnemigo = 3;

// Variables globales del DOM
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
const sectionReiniciar = document.getElementById('reiniciar');
const sectionMensajes = document.getElementById('mensajes');

const spanPersonajeJugador = document.getElementById('personaje-jugador');
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
const spanVidasJugador = document.getElementById('vida-jugador');
const spanVidasEnemigo = document.getElementById('vida-enemigo');

const botonPersonajeJugador = document.getElementById('boton-personaje');
const botonPunio = document.getElementById("boton-punio");
const botonPatada = document.getElementById("boton-patada");
const botonBarrida = document.getElementById("boton-barrida");
const botonReiniciar = document.getElementById('boton-reiniciar');
const botonReglas = document.getElementById('boton-reglas');
const botonCerrarReglas = document.getElementById('cerrar-reglas');
const modalReglas = document.getElementById('modal-reglas');

// ---------------- FUNCIONES ----------------

function iniciarJuego() {
    // let sectionSeleccionarAtaque = document.getElementaryById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none';

    // let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';

    // let sectionMensajes = document.getElementById('mensajes')
    sectionMensajes.style.display = 'none';

    // let botonPersonajeJugador = document.getElementById('boton-personaje');
    // Agregar un evento al botón de seleccionar personaje
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    
    // let botonPunio = document.getElementById("boton-punio");
    botonPunio.addEventListener("click", ataquePunio);
    //let botonPatada = document.getElementById("boton-patada");
    botonPatada.addEventListener("click", ataquePatada);
    //let botonBarrida = document.getElementById("boton-barrida");
    botonBarrida.addEventListener("click", ataqueBarrida);

    //let botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);

    botonReglas.addEventListener('click', mostrarReglas);
    botonCerrarReglas.addEventListener('click', cerrarReglas);

    // Cierra el modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modalReglas) {
            modalReglas.style.display = 'none';
        }
    });
}

function seleccionarPersonajeJugador() {
    const zuko = document.getElementById('zuko');
    const katara = document.getElementById('katara');
    const aang = document.getElementById('aang');
    const toph = document.getElementById('toph');
    // let spanPersonajeJugador = document.getElementById('personaje-jugador');
    // let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    // let sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');

    if (zuko.checked) {
        spanPersonajeJugador.innerHTML = 'Zuko';
    } else if (katara.checked) {
        spanPersonajeJugador.innerHTML = 'Katara';
    } else if (aang.checked) {
        spanPersonajeJugador.innerHTML = 'Aang';
    } else if (toph.checked) {
        spanPersonajeJugador.innerHTML = 'Toph';
    } else {
        // Mostrar mensaje visual en lugar de alert
        let mensajeError = document.createElement("p");
        mensajeError.innerHTML = 'Por favor, selecciona un personaje☝️';
        mensajeError.style.color = "red";
        sectionSeleccionarPersonaje.appendChild(mensajeError);

        setTimeout(() => {
            sectionSeleccionarPersonaje.removeChild(mensajeError);
        }, 2000);
        return; // <== importante: corta la funcion antes de seguir
    }

    // Solo se ejecuta si la seleccion fue valida
    sectionSeleccionarAtaque.style.display = 'block';
    sectionSeleccionarPersonaje.style.display = 'none';
    seleccionarPersonajeEnemigo();
}

function seleccionarPersonajeEnemigo() {
    let personajes = ["Zuko", "Katara", "Aang", "Toph"];
    let personajeAleatorio = personajes[Math.floor(Math.random() * personajes.length)];
    // let spanPersonajeEnemigo = document.getElementById("personaje-enemigo");
    spanPersonajeEnemigo.innerHTML = personajeAleatorio;
}

function ataquePunio() {
    ataqueJugador = "Puño 🤜🏻";
    ataqueAleatorioEnemigo();
}

function ataquePatada() {
    ataqueJugador = "Patada 🦵🏻";
    ataqueAleatorioEnemigo();
}

function ataqueBarrida() {
    ataqueJugador = "Barrida 🦶🏻";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = Math.floor(Math.random() * 3);
    if (ataqueAleatorio == 0){
        ataqueEnemigo = "Puño 🤜🏻";
    } else if (ataqueAleatorio == 1){
        ataqueEnemigo = "Patada 🦵🏻";
    } else {
        ataqueEnemigo = "Barrida 🦶🏻";
    }

    combate();
}

function combate() {
    // let sectionMensajes = document.getElementById('mensajes')
    sectionMensajes.style.display = 'block';

    //let spanVidasJugador = document.getElementById('vida-jugador');
    //let spanVidasEnemigo = document.getElementById('vida-enemigo');

    if (ataqueEnemigo === ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador === "Puño 🤜🏻" && ataqueEnemigo === "Barrida 🦶🏻") ||
        (ataqueJugador === "Patada 🦵🏻" && ataqueEnemigo === "Puño 🤜🏻") ||
        (ataqueJugador === "Barrida 🦶🏻" && ataqueEnemigo === "Patada 🦵🏻")
    ) {
        crearMensaje("GANASTE");
        vidaEnemigo--; //Resta una vida al enemigo
        spanVidasEnemigo.innerHTML = vidaEnemigo; //Actualiza el DOM
    } else {
        crearMensaje("PERDISTE");
        vidaJugador--; // Resta una vida al jugador
        spanVidasJugador.innerHTML = vidaJugador;
    }

    revisarVidas(); // Verifica si alguien gano o perdio
}

function revisarVidas() {
    if (vidaEnemigo == 0) {
        crearMensajeFinal("🎉 Felicidades, ganaste el juego!");
    } else if (vidaJugador == 0) {
        crearMensajeFinal("😢 Perdiste, mejor suerte la próxima vez!");
    }
}

function crearMensaje(resultado) {
    let mensajes = document.querySelector('#mensajes p'); //querySelector selecciona un solo elemento del DOM y '#mensajes p' selecciona el elemento con id="mensajes"
    mensajes.innerHTML += `<br>Tu personaje lanzó ${ataqueJugador} y el enemigo lanzó ${ataqueEnemigo}: ${resultado}`;
}

function crearMensajeFinal(resultadoFinal) {
    let mensajes = document.querySelector('#mensajes p');
    mensajes.innerHTML = resultadoFinal;

    // Deshabilitar botones de ataque tras terminar el juego
    botonPunio.disabled = true;
    botonPatada.disabled = true;
    botonBarrida.disabled = true;

    // let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    // Reiniciar las vidas a 3
    vidaJugador = 3;
    vidaEnemigo = 3;

    // Reiniciar los textos de vidas en el DOM
    // document.getElementById('vida-jugador').innerHTML = vidaJugador;
    // document.getElementById('vida-enemigo').innerHTML = vidaEnemigo;
    spanVidasJugador.innerHTML = vidaJugador;
    spanVidasEnemigo.innerHTML = vidaEnemigo;

    // Vaciar los mensajes
    let mensajes = document.querySelector('#mensajes p');
    mensajes.innerHTML = "";

    // Resetear la seleccion de personajes
    // document.getElementById('personaje-jugador').innerHTML = "";
    // document.getElementById('personaje-enemigo').innerHTML = "";
    spanPersonajeJugador.innerHTML = "";
    spanPersonajeEnemigo.innerHTML = "";

    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
        input.disabled = false; // Asegura que esten habilitados
    });

    // Habilitar los botones de ataque
    // document.getElementById("boton-punio").disabled = false;
    // document.getElementById("boton-patada").disabled = false;
    // document.getElementById("boton-barrida").disabled = false;
    botonPunio.disabled = false;
    botonPatada.disabled = false;
    botonBarrida.disabled = false;

    alert("Juego reiniciado. Selecciona nuevamente tu personaje.");
    // let sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
    // sectionSeleccionarPersonaje.style.display = 'block'
    // iniciarJuego();
    sectionSeleccionarPersonaje.style.display = 'block';
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';
    sectionMensajes.style.display = 'none';
}

function mostrarReglas() {
    // const modal = document.getElementById('modal-reglas');
    modalReglas.style.display = 'flex';
}

function cerrarReglas() {
    // const modal = document.getElementById('modal-reglas');
    modalReglas.style.display = 'none';
}

// Iniciar el juego al cargar la página
window.addEventListener('load', iniciarJuego);
