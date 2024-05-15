const express = require("express");
const app = express();
const port = 3000;
const log = console.log;

const usuarios = [
    { id: 1, nombre: 'Yonny' },
    { id: 2, nombre: 'Jorge' },
    { id: 3, nombre: 'Marcelo' },
    { id: 4, nombre: 'Camila' },
    { id: 5, nombre: 'Delia' },
    { id: 6, nombre: 'Ignacia' },
    { id: 7, nombre: 'Jose' },
    { id: 8, nombre: 'Leonardo' },
    { id: 9, nombre: 'Luis' },
    { id: 10, nombre: 'Matias' }
]

app.use(express.urlencoded({ extended: true }));

app.post('/juego', (req, res) => {
    const username = req.body.username;
    res.redirect(`/abracadabra/juego/${username}`)
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/inicio.html')
});

app.get("/abracadabra/usuarios", (req, res) => {
    res.json({
        usuarios,
        message: 'Operación completada con éxito.'
    });
});

//Middleware
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const usuario_ingresado = req.params.usuario;
    const usuario_encontrado = usuarios.find(usuario => usuario.nombre.toLowerCase() === usuario_ingresado.toLowerCase());
    if (usuario_encontrado) {
        next();
    } else {
        res.redirect('/assets/who.jpeg')
    }
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile(__dirname + '/private/index.html')
});

app.get("/abracadabra/conejo/:n", (req, res) => {
    const n_conejo = req.params.n;
    const n_random = Math.floor(Math.random() * 4) + 1;
    if (n_conejo >= 1 && n_conejo <= 4) {
        n_conejo == n_random
            ? res.redirect('/assets/conejito.jpg')
            : res.redirect('/assets/voldemort.jpg')
    } else {
        res.send(`Esta página no existe.`)
    }
});

app.get("*", (req, res) => {
    res.send(`Esta página no existe. <br> <a href="/">Volver a Inicio</a>`)
})

app.listen(port, () => {
    log(`Servidor inicializado en el puerto ${port}`);
});