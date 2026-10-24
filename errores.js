
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formularioError");
    const mensaje = document.getElementById("mensajeError");
    const campoFecha = document.getElementById("fechaError");

    const hoy = new Date();
    const fechaLocal = new Date(
        hoy.getTime() - hoy.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    campoFecha.value = fechaLocal;

    // Recuperar reportes guardados en el navegador.
    function obtenerReportes() {
        try {
            const datos = localStorage.getItem("saesReportesErrores");
            return datos ? JSON.parse(datos) : [];
        } catch (error) {
            return [];
        }
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const usuario = document.getElementById("usuarioError").value.trim();
        const modulo = document.getElementById("moduloError").value;
        const prioridad = document.getElementById("prioridadError").value;
        const descripcion = document.getElementById("descripcionError").value.trim();
        const fecha = campoFecha.value;

        if (
            usuario === "" ||
            modulo === "" ||
            prioridad === "" ||
            descripcion === "" ||
            fecha === ""
        ) {
            mensaje.textContent = "Por favor, completa todos los campos.";
            mensaje.style.color = "#ff7373";
            return;
        }

        if (fecha > fechaLocal) {
            mensaje.textContent = "La fecha no puede ser posterior al día de hoy.";
            mensaje.style.color = "#ff7373";
            return;
        }

        const reporte = {
            id: Date.now(),
            usuario: usuario,
            modulo: modulo,
            prioridad: prioridad,
            descripcion: descripcion,
            fecha: fecha
        };

        try {
            const reportes = obtenerReportes();
            reportes.push(reporte);

            localStorage.setItem(
                "saesReportesErrores",
                JSON.stringify(reportes)
            );

            mensaje.textContent =
                "Reporte guardado correctamente en este navegador.";
            mensaje.style.color = "#70e7bd";

            formulario.reset();
            campoFecha.value = fechaLocal;
        } catch (error) {
            mensaje.textContent =
                "No fue posible guardar el reporte en el navegador.";
            mensaje.style.color = "#ff7373";
        }
    });
});
