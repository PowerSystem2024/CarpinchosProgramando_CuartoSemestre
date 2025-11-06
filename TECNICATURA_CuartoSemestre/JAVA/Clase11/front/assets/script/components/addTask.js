import checkComplete from "./checkComplete.js";
import createDelIcon from "./deleteIco.js";
import { displayTasks } from "./displayTags.js";
import { sendTask } from "../data/sendTask.js";

export const addTask = (event) => {
  event?.preventDefault?.();
  console.log("addTask disparado");

  const list = document.querySelector("[data-list]");
  const input = document.querySelector("[data-form-input]");
  const calendar = document.querySelector("[data-form-date]");

  const title = (input?.value || "").trim();
  const date = (calendar?.value || "").trim();

  console.log("valores:", { title, date });

  if (!title || !date) {
    window.Swal?.fire({
      icon: "warning",
      title: "Completá título y fecha",
      timer: 1400,
      showConfirmButton: false,
      position: "top",
    });
    return;
  }

  const dateFormat = moment(date).format("YYYY-MM-DD");
  const time = moment(date).format("HH:mm");
  const taskObj = { title, date: dateFormat, time, finished: false };

  console.log("enviando taskObj", taskObj);

  if (list) list.innerHTML = "";
  sendTask(taskObj);
  displayTasks();
};

// createTask

// Arrow function o funcion flechas / anónimas
export const createTask = ({ id, title, time, finished }) => {
    const task = document.createElement("li");
    task.classList.add("card");

    // Backticks
    const taskContent = document.createElement("div");
    const check = checkComplete(id, finished);

    const titleTask = document.createElement("span");
    titleTask.classList.add("task");
    titleTask.innerText = title;
    taskContent.appendChild(check);
    taskContent.appendChild(titleTask);

    const dateElement = document.createElement("span");
    dateElement.innerHTML = time;
    task.appendChild(taskContent);
    task.appendChild(dateElement);
    task.appendChild(createDelIcon(id));
    return task;
};