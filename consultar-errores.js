
document.addEventListener("DOMContentLoaded", function () {
    const listaReportes = document.getElementById("listaReportes");
    const mensajeReportes = document.getElementById("mensajeReportes");
    const botonActualizar = document.getElementById("actualizarReportes");

    function cargarReportes() {
        listaReportes.replaceChildren();

        let reportes = [];

        try {
            reportes = JSON.parse(
                localStorage.getItem("saesReportesErrores") || "[]"
            );
        } catch (error) {
            mensajeReportes.textContent =
                "No fue posible leer los reportes guardados.";
            mensajeReportes.style.color = "#ff7373";
            return;
        }

        if (!Array.isArray(reportes) || reportes.length === 0) {
            mensajeReportes.textContent =
                "Todavía no hay reportes registrados en este navegador.";
            mensajeReportes.style.color = "#9db5d2";
            return;
        }

        reportes.forEach(function (reporte) {
            const fila = document.createElement("tr");

            const datos = [
                reporte.fecha || "",
                reporte.usuario || "",
                reporte.modulo || "",
                reporte.prioridad || "",
                reporte.descripcion || ""
            ];

            datos.forEach(function (dato) {
                const celda = document.createElement("td");
                celda.textContent = dato;
                fila.appendChild(celda);
            });

            listaReportes.appendChild(fila);
        });

        mensajeReportes.textContent =
            "Se encontraron " + reportes.length + " reporte(s).";
        mensajeReportes.style.color = "#70e7bd";
    }

    botonActualizar.addEventListener("click", cargarReportes);

    cargarReportes();
});
