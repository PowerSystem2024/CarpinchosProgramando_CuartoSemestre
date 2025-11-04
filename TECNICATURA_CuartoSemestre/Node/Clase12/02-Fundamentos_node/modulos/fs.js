const fs = require('fs');

// Primero leemos el archivo .txt
function leer(ruta, cb) {
    fs.readFile(ruta, (err, data) => {
        cb(data.toString());
    })
}


// Segundo: escribimos el archivo1.txt creandolo
function escribir(ruta, contenido, cb){
    fs.writeFile(ruta, contenido, function(err){
     if (err){
        console.log('Nose ha podido escribir', err);
     }else{
        console.log('se ha escrito correctamente');
     }
    })
}

escribir(`${__dirname}/archivo1.txt`,'Reescribimos el archivo', console.log);
//leer(`${__dirname}/archivo.txt`, console.log); //sintaxis ES6

        