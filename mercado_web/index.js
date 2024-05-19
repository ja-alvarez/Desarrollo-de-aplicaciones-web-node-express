const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require("path");

const port = 3000;
const log = console.log;

app.use(express.static("public"));

app.listen(port, () => {
    log(`El servidor está inicializado en el puerto ${port}`);
});

app.engine('handlebars', engine({
    partialsDir: [
        path.join(__dirname, "/views/partials/")
    ],
    helpers: {
        // Helper cambiar inicial a mayuscula
        mayuscula: (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
}));

app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use('/bootstrap', express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));
app.use('/jquery', express.static(path.join(__dirname, "/node_modules/jquery/dist")));

app.get(["/", "/home", "/inicio"], (req, res) => {
    const productos = [
        { 'nombre': 'platano', 'descripcion': 'Platano Extra Granel 1 kg (3 a 4 un. aprox)', 'precio': '1.390' },
        { 'nombre': 'cebollas', 'descripcion': 'Cebolla Granel (2 a 4 un. aprox)', 'precio': '1.590' },
        { 'nombre': 'lechuga', 'descripcion': 'Lechuga escarola un.', 'precio': '1.190' },
        { 'nombre': 'papas', 'descripcion': 'Papa Granel (4 a 6 un. aprox)', 'precio': '1.590' },
        { 'nombre': 'pimenton', 'descripcion': 'Pimiento verde un.', 'precio': '990' },
        { 'nombre': 'tomate', 'descripcion': 'Tomate Larga Vida Granel (2 a 4 un. aprox).', 'precio': '1.990' },
        { 'nombre': 'manzana', 'descripcion': 'Manzana royal gala granel.', 'precio': '2.190' },
        { 'nombre': 'naranja', 'descripcion': 'Naranja Importada Granel (4 a 6 un. aprox).', 'precio': '2.690' }

    ];
    res.render("home", {
        titulo: "Bienvenido al mercado WEB, seleccione sus productos.",
        productos: productos
    });
});

app.get("*", (req, res) => {
    res.status(404).send(`<h1 style="font-size: 3em; text-align:center; margin-top: 30px;">Error 404. Página no encontrada.</h1>`)
})