
document.addEventListener("DOMContentLoaded", function () {
    const opciones = document.querySelectorAll("[data-seccion]");

    const rutas = {
        productos: "productos.html",
        pedidos: "pedidos.html",
        inventario: "inventario.html",
        despachos: "despachos.html",
        errores: "errores.html"
    };

    opciones.forEach(function (opcion) {
        opcion.addEventListener("click", function (evento) {
            const seccion = opcion.dataset.seccion;
            const ruta = rutas[seccion];

            if (ruta) {
                evento.preventDefault();
                window.location.href = ruta;
            }
        });
    });
});
