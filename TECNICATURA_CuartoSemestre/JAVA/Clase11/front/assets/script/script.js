import { addTask } from "./components/addTask.js";
import { displayTasks } from "./components/displayTags.js";

window.addEventListener("DOMContentLoaded", () => {
  try {
    const btn = document.querySelector("[data-form-btn]");
    const form = document.querySelector("form");

    console.log("script.js cargado. btn:", !!btn, "form:", !!form);

    if (btn) btn.addEventListener("click", (e) => {
      console.log("click botón");
      addTask(e);
    });

    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("submit form");
      addTask(e);
    });

    displayTasks();
  } catch (err) {
    console.error("Error inicializando listeners:", err);
  }
});