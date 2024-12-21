const toggleCheckbox = document.getElementById("toggleCheckbox");
const elementLogin = document.getElementById("login");
const elementContainer = document.getElementById("container");
const elementProfessor = document.getElementById("professor");

window.onload = (event) => {
    elementLogin.classList.remove("mover");
    elementContainer.classList.remove("mostrar");
    elementProfessor.classList.add("mostrarProfessor");
};

document.addEventListener("DOMContentLoaded", function() {
        
    toggleCheckbox.addEventListener("change", function() {
        if (toggleCheckbox.checked) {
            elementLogin.classList.add("mover");
            elementContainer.classList.add("mostrar");
            elementProfessor.classList.remove("mostrarProfessor");
        } else {
            elementLogin.classList.remove("mover");
            elementContainer.classList.remove("mostrar");
            elementProfessor.classList.add("mostrarProfessor");
        }
    });
});
