import checkComplete from "./checkComplete.js";
import createDelIcon from "./deleteIco.js";
import { displayTasks } from "./displayTasks.js";
import { sendTask } from "../data/sendTask.js";

export const addTask = (event) => {
    event.preventDefault(); // Evita que se recargue la pagina borrando la información

    const list = document.querySelector("[data-list]"); // Guardamos el ul que contendra los mensajes
    const input = document.querySelector("[data-form-input]"); // Guardamos el input
    const calendar = document.querySelector("[data-form-date]"); // Guardamos el input de la fecha

    const title = input.value; // Guardamos la información del input
    const date = calendar.value; // Guardamos la información de la fecha
    const dateFormat = moment(date).format("yyyy-MM-DD");
    const time = moment(date).format("HH:mm");

    if (input == "" || date == "") {
        // Corroboramos que ambos inputs tengan información
        return;
    }

    input.value = ""; // Vaciamos el input
    calendar.value = ""; // Vaciamos el calendario

    const finished = false; // Se utilizará para verificar si el check está activado o no

    const taskObj = {
        // Crea una variable que almacena una clave y su valor
        title, // Texto
        date:dateFormat, // Fecha
        time, // Hora
        finished, // Para el check
    };  

    list.innerHTML = ""; // Por cada vez que se agreguen tareas nuevas se vacía la estructura

    sendTask(taskObj); // Llama a la función que envía la tarea a la API
    displayTasks(); // Llama a la función que agrupa las fechas
};

// Arrow function o funciones flechas / anónimas
export const createTask = ({ id, title, time,finished}) => {
    const task = document.createElement("li"); // Creo un elemento li
    task.classList.add("card"); // Agregamos una clase al task

    // Backticks
    const taskContent = document.createElement("div"); // Creo un elemento div
    const check = checkComplete(id,finished);

    const titleTask = document.createElement("span"); // Creo un elemento span
    titleTask.classList.add("task"); // Agregamos la clase task al titleTask
    titleTask.innerText = title; // Agregamos al titleTask el valor del inpút
    taskContent.appendChild(check); // Agregamos al div check
    taskContent.appendChild(titleTask); // Agregamos al contenido el titleTask

    const dateElement = document.createElement("span"); // Creo el elemento span para la fecha
    dateElement.innerHTML = time; // Le agrego al span la hora obtenida
    task.appendChild(taskContent); // Agrego al task el div con la info ingresada en el input
    task.appendChild(dateElement); // Agrego al task la fecha
    task.appendChild(createDelIcon(id)); // Agrego al contenido el icono del basurero
    return task;
};