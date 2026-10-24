
const formulario = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const correo = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    if (correo === "" || contrasena === "") {
        mensaje.textContent = "Por favor, completa todos los campos.";
        mensaje.style.color = "red";
        return;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
        mensaje.textContent = "Ingresa un correo electrónico válido.";
        mensaje.style.color = "red";
        return;
    }

    mensaje.textContent =
        "Datos recibidos. La autenticación real aún no está configurada.";
    mensaje.style.color = "#073575";
});
