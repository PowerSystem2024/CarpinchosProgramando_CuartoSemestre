# 📝 Quiz: Miércoles 20 de agosto del 2025

### 1. Tienes varios labels que le indican al usuario qué está seleccionando con diferentes inputs de tipo radio. Pero al darle click a los labels, sus inputs correspondientes NO se seleccionan. ¿Cómo solucionarías este problema?

**a.** Asignando el mismo valor en el atributo id de los inputs y el atributo id de sus labels correspondientes.

**b.** Asignando el mismo valor en el atributo id de los inputs y el atributo for de sus labels correspondientes.

**c.** Este comportamiento No se puede solucionar. Solo algunos navegadores (ej. Google Chrome) vinculan automáticamente a los labels con sus inputs, pero otros NO lo soportan (ej. Opera)

<br>

### 2. ¿Qué etiqueta de HTML le permite a los usuarios escribir lo que ellos quieran?

**a.** text

**b.** Ninguna. Toda etiqueta HTML y su contenido debe ser escrito por un programador, nunca por los usuarios.

**c.** prompt

**d.** input

**e.** user-custom

<br>

### 3. ¿Qué significa maquetar una página web?

**a.** Es cuando agregamos JavaScript el frontend de una página web.

**b.** Escribir su estructura en HTML y CSS

**c.** Es cuando conectamos el backend a una pagina web.

**d.** Es un sinónimo de programar

<br>

### 4. Tienes el siguiente código HTML:

```
<button id="lanzar-ataque">¡Lanzar ataque!</button>
```
### Necesitas ejecutar una alerta cada vez que los usuarios le den click a este botón. ¿Cómo lo harías?

a. 
```
   let botonLanzarAtaque = document.getElementById('lanzar-ataque')

   botonLanzarAtaque.click = alert('Mensaje de la alerta')
```

b. 
```
   let botonLanzarAtaque = document.getElementById('lanzar-ataque')

   function enviarAlerta(){

	alert('Mensaje de la alerta')

   }

   botonLanzarAtaque.addEventListener('click', enviarAlerta())
```

c. 
```
   let botonLanzarAtaque = document.getElementById('lanzar-ataque')

   botonLanzarAtaque.addEventListener('click', alert('Mensaje de la alerta'))
```

d. 
```
   let botonLanzarAtaque.click.addEventListener = alert('Mensaje de la alerta')
```

# Respuestas:

1) La relación correcta se hace con for en el label y id en el input. <br>
**b. Asignando el mismo valor en el atributo id de los inputs y el atributo for de sus labels correspondientes.**

2) La etiqueta que recibe texto libre de los usuarios es <input> (ejemplo: <input type="text">). <br>
**d. input**

3) Maquetar es estructurar la página con HTML y CSS, sin lógica de programación. <br>
**b. Escribir su estructura en HTML y CSS**

4) Usamos addEventListener para escuchar el evento "click".
  Pasamos la referencia a la función enviarAlerta (sin ()), para que se ejecute cuando ocurra el click.
  (En el enunciado estaba escrito con enviarAlerta() y eso es un error, porque la función se ejecutaría de inmediato. Lo correcto es enviarAlerta) <br>

**b.**

```
   let botonLanzarAtaque = document.getElementById('lanzar-ataque')

   function enviarAlerta(){

	alert('Mensaje de la alerta')

   }

   botonLanzarAtaque.addEventListener('click', enviarAlerta())
```
