// this === global === true

// Mostrar algo en consola
// console.log();

// Mostrar un mensaje en forma de error
// console.error();

// Ejecutar un código después de un tiempo
// setTimeout(() => {});

// Ejecutar un código cada intervalo de tiempo
// setInterval(() => {});

// Da prioridad de ejecución a una función asincrónica
// setImmidiate(() => {}); // Documentación -> https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate

// Mostrar documentación
// console.log(global);
// console.log(setInterval);
// console.log(process);
// console.log(__dirname);
console.log(__filename);

/**/
let i = 0;
let intervalo = setInterval(() => {
    console.log('Hola');
    if (i === 3) {
        clearInterval(intervalo); // Detenemos la función
    }
    i++;
}, 1000);

setImmediate(() => {
    console.log('Saludo inmediato');
});

// require();

// Variables globales -> no es buena práctica usarlas en Node
globalThis.miVariable = 'Mi variable global';
console.log(miVariable);
