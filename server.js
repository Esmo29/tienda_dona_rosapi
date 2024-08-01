const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Insertar producto
app.post('/productos', (req, res) => {
    const { codigo, producto, precio, cantidad } = req.body;
    db.run(`INSERT INTO productos (codigo, producto, precio, cantidad) VALUES (?, ?, ?, ?)`, [codigo, producto, precio, cantidad], function(err) {
        if (err) {
            return res.status(500).send("Error al insertar producto");
        }
        res.status(201).send("Producto insertado");
    });
});

// Actualizar producto
app.put('/productos/:codigo', (req, res) => {
    const { codigo } = req.params;
    const { precio, cantidad } = req.body;
    db.run(`UPDATE productos SET precio = ?, cantidad = ? WHERE codigo = ?`, [precio, cantidad, codigo], function(err) {
        if (err) {
            return res.status(500).send("Error al actualizar producto");
        }
        res.send("Producto actualizado");
    });
});

// Borrar producto
app.delete('/productos/:codigo', (req, res) => {
    const { codigo } = req.params;
    db.run(`DELETE FROM productos WHERE codigo = ?`, codigo, function(err) {
        if (err) {
            return res.status(500).send("Error al borrar producto");
        }
        res.send("Producto borrado");
    });
});

// Obtener productos
app.get('/productos', (req, res) => {
    db.all(`SELECT * FROM productos`, [], (err, rows) => {
        if (err) {
            return res.status(500).send("Error al obtener productos");
        }
        res.json(rows);
    });
});

// Producto más cercano a acabarse
app.get('/productos/agotados', (req, res) => {
    db.all(`SELECT * FROM productos WHERE cantidad <= (0.1 * (SELECT cantidad FROM productos WHERE codigo = productos.codigo))`, [], (err, rows) => {
        if (err) {
            return res.status(500).send("Error al obtener productos");
        }
        res.json(rows);
    });
});

// Costo total del inventario
app.get('/inventario/costo', (req, res) => {
    db.get(`SELECT SUM(precio * cantidad) AS costo_total FROM productos`, [], (err, row) => {
        if (err) {
            return res.status(500).send("Error al obtener el costo total del inventario");
        }
        res.json(row);
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
