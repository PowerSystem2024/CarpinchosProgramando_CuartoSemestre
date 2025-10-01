function hola(nombre, miCallback){
    setTimeout( function(){
        console.log('Hola '+ nombre);
        miCallback();
    }, 1000);
}

function adios(nombre, otroCallback){
    setTimeout(function(){
        console.log('Adios '+ nombre);
        otroCallback();
    }, 1500);
}

console.log('Inciando el proceso...');
hola('Carlos', function(nombre){
    adios(nombre, function(){
        console.log('Terminando el proceso...');
    });
});

//hola('Carlos', function(){});
//adios('Carlos', function(){});
