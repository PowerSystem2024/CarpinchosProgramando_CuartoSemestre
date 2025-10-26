// La palabra async se puede utilizar sin el await. Además, no es necesaria porque las funciones ya son asíncronas
// Igualmente, proyectan una sincronía visual
async function hola(nombre){
    return new Promise(function (resolve, reject) {
        setTimeout( function () {
            console.log('Hola '+nombre);
            resolve(nombre);
        }, 1000);
    });
}

async function hablar(nombre){
    return new Promise( (resolve, reject) => {
        setTimeout( function () {
            console.log('bla bla bla bla');
            resolve(nombre);
            reject ("hay un error")
        }, 1000);
    });
}

async function adios(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log('Adios ' + nombre);
            resolve();
        }, 1000);
    });
}

// await hola('Ariel'); // Es una mala sintaxis

// await solo es válido dentro de una función asíncrona
async function main() {
    let nombre = await hola('Ariel');
    await hablar();
    await hablar();
    await hablar();
    await adios(nombre);
    console.log('Terminamos el proceso...');
}

console.log('Empezamos el proceso...');
main();
console.log('Esta va a ser la segunda instrucción');

// CÓDIGO EN INGLÉS
async function sayHello(name){
    return new Promise(function (resolve, reject) {
        setTimeout( function () {
            console.log('Hello '+ name);
            resolve(name);
        }, 1000);
    });
}

async function talk(name){
    return new Promise( (resolve, reject) => {
        setTimeout( function () {
            console.log('bla bla bla bla');
            resolve(name);
            // reject ("hay un error")
        }, 1000);
    });
}

async function sayBye(name) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log('Goodbye ' + name);
            resolve(name);
        }, 1000);
    });
}

async function conversation(name) {
    console.log('Starting the async process...');
    await sayHello(name);
    await talk();
    await talk();
    await talk();
    await sayBye(name);
    console.log('Process completed');
}

conversation('Ariel');