
document.addEventListener("DOMContentLoaded", function () {
    const tabla = document.getElementById("tablaPedidos");
    const buscador = document.getElementById("buscarPedido");
    const sinPedidos = document.getElementById("sinPedidos");
    const mensaje = document.getElementById("mensajePedido");

    const totalPedidos = document.getElementById("totalPedidos");
    const pedidosProceso = document.getElementById("pedidosProceso");
    const pedidosEntregados = document.getElementById("pedidosEntregados");

    const claveAlmacenamiento = "saesEstadosPedidos";

    // Recuperar los estados guardados en el navegador.
    let estadosGuardados = {};

    try {
        estadosGuardados = JSON.parse(
            localStorage.getItem(claveAlmacenamiento) || "{}"
        );
    } catch (error) {
        estadosGuardados = {};
    }

    const filas = Array.from(tabla.querySelectorAll("tr"));

    filas.forEach(function (fila) {
        const numeroPedido = fila.cells[0].textContent.trim();
        const selector = fila.querySelector(".selector-estado");

        if (estadosGuardados[numeroPedido]) {
            selector.value = estadosGuardados[numeroPedido];
        }

        selector.addEventListener("change", function () {
            estadosGuardados[numeroPedido] = selector.value;

            try {
                localStorage.setItem(
                    claveAlmacenamiento,
                    JSON.stringify(estadosGuardados)
                );

                mensaje.textContent =
                    "Estado del pedido " + numeroPedido +
                    " actualizado a: " + selector.value + ".";
                mensaje.style.color = "#70e7bd";
            } catch (error) {
                mensaje.textContent =
                    "No se pudo guardar el cambio en este navegador.";
                mensaje.style.color = "#ff7373";
            }

            actualizarIndicadores();
        });
    });

    // Buscar por número de pedido, cliente o producto.
    buscador.addEventListener("input", function () {
        const texto = buscador.value.trim().toLowerCase();
        let coincidencias = 0;

        filas.forEach(function (fila) {
            const coincide = fila.textContent.toLowerCase().includes(texto);

            fila.hidden = !coincide;

            if (coincide) {
                coincidencias++;
            }
        });

        sinPedidos.hidden = coincidencias > 0;
    });

    // Actualizar los indicadores según los estados actuales.
    function actualizarIndicadores() {
        const total = filas.length;

        const enProceso = filas.filter(function (fila) {
            const estado = fila.querySelector(".selector-estado").value;

            return [
                "Aprobado",
                "En producción",
                "Listo para despacho",
                "Despachado"
            ].includes(estado);
        }).length;

        const entregados = filas.filter(function (fila) {
            return fila.querySelector(".selector-estado").value === "Entregado";
        }).length;

        totalPedidos.textContent = total;
        pedidosProceso.textContent = enProceso;
        pedidosEntregados.textContent = entregados;
    }

    actualizarIndicadores();
});
