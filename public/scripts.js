document.addEventListener('DOMContentLoaded', () => {
    const insertarForm = document.getElementById('insertarForm');
    const actualizarForm = document.getElementById('actualizarForm');
    const borrarForm = document.getElementById('borrarForm');
    const verProductosBtn = document.getElementById('verProductosBtn');
    const verAgotadosBtn = document.getElementById('verAgotadosBtn');
    const verCostoBtn = document.getElementById('verCostoBtn');
    const listaProductos = document.getElementById('listaProductos');
    const listaAgotados = document.getElementById('listaAgotados');
    const costoTotal = document.getElementById('costoTotal');

    // Insertar producto
    insertarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const codigo = document.getElementById('insertarCodigo').value;
        const producto = document.getElementById('insertarProducto').value;
        const precio = document.getElementById('insertarPrecio').value;
        const cantidad = document.getElementById('insertarCantidad').value;

        fetch('/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo, producto, precio, cantidad })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            insertarForm.reset();
        });
    });

    // Actualizar producto
    actualizarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const codigo = document.getElementById('actualizarCodigo').value;
        const precio = document.getElementById('actualizarPrecio').value;
        const cantidad = document.getElementById('actualizarCantidad').value;

        fetch(`/productos/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ precio, cantidad })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            actualizarForm.reset();
        });
    });

    // Borrar producto
    borrarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const codigo = document.getElementById('borrarCodigo').value;

        fetch(`/productos/${codigo}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            borrarForm.reset();
        });
    });

    // Ver productos
    verProductosBtn.addEventListener('click', () => {
        fetch('/productos')
        .then(response => response.json())
        .then(data => {
            listaProductos.innerHTML = '';
            data.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `Código: ${producto.codigo}, Producto: ${producto.producto}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`;
                listaProductos.appendChild(li);
            });
        });
    });

    // Ver productos cerca de acabarse
    verAgotadosBtn.addEventListener('click', () => {
        fetch('/productos/agotados')
        .then(response => response.json())
        .then(data => {
            listaAgotados.innerHTML = '';
            data.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `Código: ${producto.codigo}, Producto: ${producto.producto}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`;
                listaAgotados.appendChild(li);
            });
        });
    });

    // Ver costo total del inventario
    verCostoBtn.addEventListener('click', () => {
        fetch('/inventario/costo')
        .then(response => response.json())
        .then(data => {
            costoTotal.textContent = `Costo Total del Inventario: ${data.costo_total}`;
        });
    });
});
