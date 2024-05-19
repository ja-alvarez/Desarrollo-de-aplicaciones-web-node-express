//npx nodemon index.js

const express = require ('express');
const app = express();
const { engine } = require('express-handlebars');
//const exphbs = require('express-handlebars');
const path = require("path");
//const { fileURLToPath } = require("url");
//const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = 3000;
const log = console.log;

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto ${port}`);
});

app.engine('handlebars', engine({
	partialsDir: [
		path.join(__dirname, "/views/partials/")
	]
}));

//app.engine("handlebars", engine); // hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use('/bootstrap', express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));
app.use('/jquery', express.static(path.join(__dirname, "/node_modules/jquery/dist")));

app.get(["/", "/home", "/inicio"], (req, res) => {
    res.render("home", {
        titulo: "Bienvenido al mercado web, seleccione sus productos.",
        productos: ['banana', 'cebollas', 'lechuga', 'papas', 'pimenton', 'tomate']
    });
});

app.get("*", (req, res) => {
    res.status(404).send(`<h1 style="font-size: 3em; text-align:center; margin-top: 30px;">Error 404. Página no encontrada.</h1>`)
})