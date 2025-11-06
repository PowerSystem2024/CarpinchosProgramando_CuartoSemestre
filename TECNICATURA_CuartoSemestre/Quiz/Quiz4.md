## 1. Tarea de investigación, deben buscar mas información de lo que es un EvenLoop con Node.js y enviarmela, la investigación puede ser a través de ChatGPT o de cualquier lugar pero esta información debe ser veraz y sertera.

### ¿Qué es el Event Loop en Node.js?

El Event Loop es un bucle que está ejecutándose todo el tiempo, es el mecanismo que permite a Node.js ejecutar tareas de forma asincrónica y no bloqueante. Esto significa que puede manejar muchas operaciones al mismo tiempo sin detener el flujo del programa.

Node.js usa una sola hebra (hilo) para ejecutar código JavaScript. Cuando se encuentra una tarea lenta (como leer un archivo o esperar una respuesta de red), la delega al sistema. Mientras tanto, sigue ejecutando otras tareas.

Cuando la tarea lenta termina, su resultado se coloca en una cola de espera (callback queue). El Event Loop revisa esa cola y ejecuta las funciones pendientes cuando el hilo principal está libre. Esto lo hace ideal para servidores web que manejan muchas conexiones simultáneas sin necesidad de múltiples hilos.

Fuente: Clase 04 Profundizamos la teoría en Node -> 4.2 Event Loop -> bucle de elementos Parte 1 y 2

### PRESENTAR RESPUESTAS Y INVESTIGACIÓN POR CORREO

## 2. Node.js es un entorno de ejecución multiplataforma basado en JavaScript, es de código abierto y principalmente se usa para servidores web. ¿Esto que quiere decir?

a. Quiere decir que lo utilizan los programadores Backend [x]

b. Esto no quiere decir nada extraordinario, es irrelevante

c. Esto quiere decir que es el preferido del programador Frontend

d. Ninguna de las respuestas es correcta



## 3. En el tema de node ¿Qué es el stack de un proceso? esto es algo que hablamos en la clase pasada

a. Una pila (stack en inglés) es una lista ordenada o estructura de datos que permite almacenar y recuperar datos

b. Es una lista ordenada siendo el modo de acceso a sus elementos de tipo LIFO

c. Es una lista estructurada siendo el modo de acceso a sus elementos de tipo: último en entrar, primero en salir

d. Todas las respuestas son correctas [x]
