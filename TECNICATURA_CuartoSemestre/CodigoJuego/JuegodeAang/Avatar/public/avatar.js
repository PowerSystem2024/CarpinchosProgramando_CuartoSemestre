// CLASE PERSONAJE
class Personaje {
    constructor(nombre, imagen) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = 3;
    }

    atacar() {
        const ataques = ["Puño 🤜🏻", "Patada 🦵🏻", "Barrida 🦶🏻"];
        return ataques[Math.floor(Math.random() * ataques.length)];
    }
}

// CLASE JUEGO
class Juego {
    constructor() {
        this.personajesDisponibles = [];
        this.jugador = null;
        this.enemigo = null;
        this.ataqueJugador = "";
        this.ataqueEnemigo = "";
        
        // Referencias a elementos DOM
        this.sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
        this.sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
        this.sectionReiniciar = document.getElementById('reiniciar');
        this.sectionMensajes = document.getElementById('mensajes');
        
        this.spanPersonajeJugador = document.getElementById('personaje-jugador');
        this.spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
        this.spanVidasJugador = document.getElementById('vida-jugador');
        this.spanVidasEnemigo = document.getElementById('vida-enemigo');
        
        this.botonPersonajeJugador = document.getElementById('boton-personaje');
        this.botonPunio = document.getElementById("boton-punio");
        this.botonPatada = document.getElementById("boton-patada");
        this.botonBarrida = document.getElementById("boton-barrida");
        this.botonReiniciar = document.getElementById('boton-reiniciar');
        this.botonReglas = document.getElementById('boton-reglas');
        this.botonCerrarReglas = document.getElementById('cerrar-reglas');
        this.modalReglas = document.getElementById('modal-reglas');
    }

    iniciar() {
        this.inicializarPersonajes();
        this.configurarEventListeners();
        this.ocultarSecciones();
    }

    inicializarPersonajes() {
        this.personajesDisponibles = [
            new Personaje("Zuko", "assets/Zuko.jpg"),
            new Personaje("Katara", "assets/Katara.jpg"),
            new Personaje("Aang", "assets/Aang.jpg"),
            new Personaje("Toph", "assets/Toph.jpg"),
            new Personaje("Sokka", "assets/Sokka.jpg"),  // Nuevo personaje
            new Personaje("Iroh", "assets/Iroh.jpg")     // Nuevo personaje
        ];
    }

    configurarEventListeners() {
        this.botonPersonajeJugador.addEventListener('click', () => this.seleccionarPersonajeJugador());
        this.botonPunio.addEventListener("click", () => this.elegirAtaque("Puño 🤜🏻"));
        this.botonPatada.addEventListener("click", () => this.elegirAtaque("Patada 🦵🏻"));
        this.botonBarrida.addEventListener("click", () => this.elegirAtaque("Barrida 🦶🏻"));
        this.botonReiniciar.addEventListener('click', () => this.reiniciar());
        this.botonReglas.addEventListener('click', () => this.mostrarReglas());
        this.botonCerrarReglas.addEventListener('click', () => this.cerrarReglas());
        
        window.addEventListener('click', (event) => {
            if (event.target === this.modalReglas) {
                this.modalReglas.style.display = 'none';
            }
        });
    }

    ocultarSecciones() {
        this.sectionSeleccionarAtaque.style.display = 'none';
        this.sectionReiniciar.style.display = 'none';
        this.sectionMensajes.style.display = 'none';
    }

    seleccionarPersonajeJugador() {
        const personajeSeleccionado = document.querySelector('input[name="personaje"]:checked');
        
        if (!personajeSeleccionado) {
            this.mostrarMensajeError('Por favor, selecciona un personaje☝️');
            return;
        }
        
        const idPersonaje = personajeSeleccionado.id;
        this.jugador = this.personajesDisponibles.find(p => p.nombre.toLowerCase() === idPersonaje);
        
        this.spanPersonajeJugador.innerHTML = this.jugador.nombre;
        this.sectionSeleccionarAtaque.style.display = 'block';
        this.sectionSeleccionarPersonaje.style.display = 'none';
        
        this.seleccionarPersonajeEnemigo();
    }

    mostrarMensajeError(mensaje) {
        let mensajeError = document.createElement("p");
        mensajeError.innerHTML = mensaje;
        mensajeError.style.color = "red";
        this.sectionSeleccionarPersonaje.appendChild(mensajeError);

        setTimeout(() => {
            this.sectionSeleccionarPersonaje.removeChild(mensajeError);
        }, 2000);
    }

    seleccionarPersonajeEnemigo() {
        const personajesDisponibles = this.personajesDisponibles.filter(p => p.nombre !== this.jugador.nombre);
        const indiceAleatorio = Math.floor(Math.random() * personajesDisponibles.length);
        this.enemigo = personajesDisponibles[indiceAleatorio];
        
        this.spanPersonajeEnemigo.innerHTML = this.enemigo.nombre;
        this.actualizarVidasEnDOM();
    }

    elegirAtaque(ataque) {
        this.ataqueJugador = ataque;
        this.ataqueEnemigo = this.enemigo.atacar();
        this.combate();
    }

    combate() {
        this.sectionMensajes.style.display = 'block';
        
        let resultado = this.determinarResultado();
        this.crearMensaje(resultado.mensaje);
        
        if (resultado.ganador === "jugador") {
            this.enemigo.vida--;
        } else if (resultado.ganador === "enemigo") {
            this.jugador.vida--;
        }
        
        this.actualizarVidasEnDOM();
        this.revisarVidas();
    }

    determinarResultado() {
        if (this.ataqueEnemigo === this.ataqueJugador) {
            return { mensaje: "EMPATE", ganador: null };
        } else if (
            (this.ataqueJugador === "Puño 🤜🏻" && this.ataqueEnemigo === "Barrida 🦶🏻") ||
            (this.ataqueJugador === "Patada 🦵🏻" && this.ataqueEnemigo === "Puño 🤜🏻") ||
            (this.ataqueJugador === "Barrida 🦶🏻" && this.ataqueEnemigo === "Patada 🦵🏻")
        ) {
            return { mensaje: "GANASTE", ganador: "jugador" };
        } else {
            return { mensaje: "PERDISTE", ganador: "enemigo" };
        }
    }

    actualizarVidasEnDOM() {
        this.spanVidasJugador.innerHTML = this.jugador.vida;
        this.spanVidasEnemigo.innerHTML = this.enemigo.vida;
    }

    revisarVidas() {
        if (this.enemigo.vida === 0) {
            this.crearMensajeFinal("🎉 Felicidades, ganaste el juego!");
        } else if (this.jugador.vida === 0) {
            this.crearMensajeFinal("😢 Perdiste, mejor suerte la próxima vez!");
        }
    }

    crearMensaje(resultado) {
        let mensajes = document.querySelector('#mensajes p');
        mensajes.innerHTML += `<br>Tu personaje lanzó ${this.ataqueJugador} y el enemigo lanzó ${this.ataqueEnemigo}: ${resultado}`;
    }

    crearMensajeFinal(resultadoFinal) {
        let mensajes = document.querySelector('#mensajes p');
        mensajes.innerHTML = resultadoFinal;

        this.botonPunio.disabled = true;
        this.botonPatada.disabled = true;
        this.botonBarrida.disabled = true;

        this.sectionReiniciar.style.display = 'block';
    }

    reiniciar() { // Vidas de los personajes
        this.personajesDisponibles.forEach(personaje => {
            personaje.vida = 3;
        });
        
        this.jugador = null;
        this.enemigo = null;
        
        this.spanVidasJugador.innerHTML = "3";
        this.spanVidasEnemigo.innerHTML = "3";
        
        this.spanPersonajeJugador.innerHTML = "";
        this.spanPersonajeEnemigo.innerHTML = "";

        let mensajes = document.querySelector('#mensajes p');
        mensajes.innerHTML = "";

        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
        });

        this.botonPunio.disabled = false;
        this.botonPatada.disabled = false;
        this.botonBarrida.disabled = false;

        this.sectionSeleccionarPersonaje.style.display = 'block';
        this.sectionSeleccionarAtaque.style.display = 'none';
        this.sectionReiniciar.style.display = 'none';
        this.sectionMensajes.style.display = 'none';
    }

    mostrarReglas() {
        this.modalReglas.style.display = 'flex';
    }

    cerrarReglas() {
        this.modalReglas.style.display = 'none';
    }
}

// Iniciar el juego
window.addEventListener('load', () => {
    const juego = new Juego();
    juego.iniciar();
});