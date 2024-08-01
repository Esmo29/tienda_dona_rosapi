const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE productos (
        codigo INTEGER PRIMARY KEY,
        producto TEXT,
        precio INTEGER,
        cantidad INTEGER
    )`);

    const stmt = db.prepare(`INSERT INTO productos (codigo, producto, precio, cantidad) VALUES (?, ?, ?, ?)`);
    const productos = [
        [1, 'peras', 4000, 65],
        [2, 'Limones', 1500, 25],
        [3, 'Moras', 2000, 30],
        [4, 'Piñas', 3000, 15],
        [5, 'Tomates', 1000, 30],
        [6, 'fresas', 3000, 12],
        [7, 'Frunas', 3000, 50],
        [8, 'Galletas', 500, 400],
        [9, 'chocolates', 1200, 500],
        [10, 'Arroz', 1200, 60]
    ];

    productos.forEach(p => stmt.run(p));
    stmt.finalize();
});

module.exports = db;
