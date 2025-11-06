import { path } from "./path.js";

export const sendTask = (taskObj) => {
    const url = `${path}create`;
    fetch(url, {
        method: "POST",
        body: JSON.stringify(taskObj),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.ok) {
                if (window.Swal) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Tarea creada",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1200);
                } else {
                    window.location.href = "index.html";
                }
            } else {
                if (window.Swal) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "No se creó la tarea",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        })
        .catch((error) => {
            console.log("Error en la solicitud:", error);
            if (window.Swal) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error de red",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
};