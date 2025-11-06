import { deleteTask } from "./../data/deleteTask.js";
import { displayTasks } from "./displayTags.js";

const createDelIcon = (id) => {
    const i = document.createElement("i"); // Creamos un elemento i
    i.classList.add("fas","fa-trash-alt", "trashIcon" ,"icon"); // Agregamos las clase al elemento i
    i.addEventListener("click", () => dumpTask(id));
    return i; // Devolvemos el valor de i
};

const dumpTask = (id) =>{
    const list = document.querySelector("[data-list]"); // Seleccionamos la lista
    deleteTask(id);
    list.innerHTML = "";
    displayTasks(); // Llamado, para mostrar las nuevas tareas modificadas
}

export default createDelIcon;