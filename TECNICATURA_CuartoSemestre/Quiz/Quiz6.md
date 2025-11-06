## 1. Explica en pocas palabras como agregarías personajes al juego desde el código, seguramente deberán investigar para esta respuesta o puede que la tengan, deben explicar como lo harían desde el HTML o el JS.

Para agregar personajes a un juego web, puedes seguir estos pasos:
Desde JavaScript:

Crear una clase o función constructora para los personajes
Definir propiedades (nombre, vida, velocidad, sprite, etc.)
Crear instancias de nuevos personajes
Agregar los personajes a un array o estructura de datos del juego

javascript// Ejemplo básico
class Personaje {
    constructor(nombre, vida, imagen) {
        this.nombre = nombre;
        this.vida = vida;
        this.imagen = imagen;
    }
}

const nuevoPersonaje = new Personaje("Guerrero", 100, "guerrero.png");
personajes.push(nuevoPersonaje);
Desde HTML:

Crear elementos DOM dinámicamente con JavaScript
O definir templates en HTML que se clonan y modifican

html<!-- Template en HTML -->
<template id="personaje-template">
    <div class="personaje">
        <img src="" alt="">
        <span class="nombre"></span>
    </div>
</template>

## 2. ¿Qué significa darle feedback al otro desarrollador? Hagan su investigación para responder.

Dar feedback a otro desarrollador significa proporcionar retroalimentación constructiva sobre su código, trabajo o desempeño. Esto incluye:

Code Review: Revisar el código de otros y sugerir mejoras
Comentarios constructivos: Señalar tanto aspectos positivos como áreas de mejora
Sugerencias técnicas: Proponer soluciones alternativas o mejores prácticas
Comunicación clara: Expresar opiniones de forma respetuosa y objetiva
Documentación: Dejar comentarios claros en pull requests o issues

El feedback efectivo ayuda al crecimiento profesional, mejora la calidad del código y fortalece el trabajo en equipo.

## 3. En HTML ¿Se aplica el paradigma de la POO?

a Si, es totalmente cierto, en HTML se aplica con etiquetas padres e hijas y generar de estas objetos.

b. No, no tiene ninguna relación este paradigma con lo que es el HTML

c. Ninguna de las respuestas

e. El que HTML tenga etiquetas padre y hijas, no hace que tenga ninguna relación con POO [x]


## 4. Les presento un problema a resolver:

Un estudiante estaba trabajando en GitHub, pero en su ordenador, pusheando todo lo que venía haciendo en su propia rama, este era un repositorio grupal, ya terminando su trabajo, haciendo merge hasta la rama main, se acordó que algo le faltaba, y era extenso, comenzó a avanzar, genero un commit, después de una interrupción siguió con su trabajo, pero cansado decidió terminar al siguiente día. A la mañana se vino directamente a terminar su trabajo inconcluso, abre el repositorio en su ordenador y encuentra que esta en la rama main, al tener cosas en el área de trabajo, no le permitió cambiar de rama. ¿Cuáles son las posibles soluciones que debería hacer? Haz un resumen con cada paso desde la terminal y sus comandos hacía GitHub.

Solución al problema de Git:
El estudiante tiene cambios sin confirmar en la rama main cuando debería estar en su rama. Aquí están las posibles soluciones:

## Opción 1: Guardar cambios con stash
bash# 1. Guardar temporalmente los cambios actuales
git stash

### 2. Cambiar a su rama personal
git checkout mi-rama

### 3. Recuperar los cambios guardados
git stash pop

### 4. Continuar trabajando y hacer commit
git add .
git commit -m "Completando trabajo pendiente"

### 5. Push a su rama
git push origin mi-rama

## Opción 2: Crear commit temporal
bash # 1. Hacer commit temporal en main (NO hacer push)
git add .
git commit -m "WIP: trabajo temporal"

### 2. Cambiar a su rama
git checkout mi-rama

### 3. Traer el commit desde main
git cherry-pick main

### 4. Volver a main y eliminar el commit temporal
git checkout main
git reset --hard HEAD~1

### 5. Volver a su rama y continuar
git checkout mi-rama
git push origin mi-rama

## Opción 3: Crear nueva rama desde main
bash# 1. Crear nueva rama desde main con los cambios actuales
git checkout -b mi-rama-nueva

### 2. Hacer commit de los cambios
git add .
git commit -m "Completando funcionalidad faltante"

### 3. Push la nueva rama
git push origin mi-rama-nueva

### 4. Crear Pull Request desde GitHub
### para hacer merge a main cuando esté listo
