
const buscador = document.getElementById("buscarProducto");
const listaProductos = document.getElementById("listaProductos");
const mensajeSinResultados = document.getElementById("sinResultados");

buscador.addEventListener("input", function () {
    const textoBuscado = buscador.value
        .trim()
        .toLowerCase();

    const productos = listaProductos.querySelectorAll(".producto-card");
    let productosVisibles = 0;

    productos.forEach(function (producto) {
        const nombre = producto.querySelector("h3").textContent.toLowerCase();
        const descripcion = producto.querySelector("p").textContent.toLowerCase();

        if (
            nombre.includes(textoBuscado) ||
            descripcion.includes(textoBuscado)
        ) {
            producto.hidden = false;
            productosVisibles++;
        } else {
            producto.hidden = true;
        }
    });

    mensajeSinResultados.hidden = productosVisibles > 0;
});
