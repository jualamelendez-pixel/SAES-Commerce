
const buscadorInventario = document.getElementById("buscarInventario");
const tablaInventario = document.getElementById("tablaInventario");
const sinInventario = document.getElementById("sinInventario");

buscadorInventario.addEventListener("input", function () {
    const busqueda = buscadorInventario.value.trim().toLowerCase();
    const filas = tablaInventario.querySelectorAll("tr");

    let coincidencias = 0;

    filas.forEach(function (fila) {
        const contenido = fila.textContent.toLowerCase();
        const coincide = contenido.includes(busqueda);

        fila.hidden = !coincide;

        if (coincide) {
            coincidencias++;
        }
    });

    sinInventario.hidden = coincidencias > 0;
});
