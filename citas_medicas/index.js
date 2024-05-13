const express = require('express');
const moment = require('moment');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const axios = require('axios');
//npx nodemon index.js

const app = express();
const port = 3000;
const log = console.log;

app.post('/registro', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const datosUsuario = response.data.results[0];
        const idUsuario = uuidv4().slice(0, 6);
        const timestamp = moment(datosUsuario.registered.date).format('MMMM Do YYYY, h:mm:ss A')
        const nuevoUsuario = {
            id: idUsuario,
            nombre: datosUsuario.name.first,
            apellido: datosUsuario.name.last,
            genero: datosUsuario.gender,
            timestamp: timestamp
        };
        usuarios.push(nuevoUsuario);
        res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error interno del servidor.');
    }
});

app.get("/", (req, res) => {
    res.send(`<a href="/usuarios">Consulta Usuarios</a>`)
})

app.get('/usuarios', (req, res) => {
    const usuariosGenero = _.groupBy(usuarios, 'genero');
    log(chalk.bgWhite.blue('Lista de usuarios registrados: '));
    log(usuarios);

    let respuesta = '';

    respuesta += 'Mujeres: <br><ol>';
    if (usuariosGenero['female']) {
        usuariosGenero['female'].forEach(usuario => {
            respuesta += `<li>Nombre: ${usuario.nombre} - Apellido: ${usuario.apellido} - ID: ${usuario.id} - Timestamp: ${usuario.timestamp}</li>`;
        });
    }
    respuesta += '</ol>';

    respuesta += 'Hombres: <br><ol>';
    if (usuariosGenero['male']) {
        usuariosGenero['male'].forEach(usuario => {
            respuesta += `<li>Nombre: ${usuario.nombre} - Apellido: ${usuario.apellido} - ID: ${usuario.id} - Timestamp: ${usuario.timestamp}</li>`;
        });
    }
    respuesta += '</ol>';
    res.send(respuesta)
    // res.json(usuariosGenero);
})

app.get("*", (req, res) => {
    res.send(`Error 404. <br>¿Qué estás buscando? <br> <a href="/">Volver</a>`)
})

app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto ${port}.`)
});

const usuarios = [];