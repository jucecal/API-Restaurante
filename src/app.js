const express = require('express');
const morgan = require('morgan');
const db = require('./config/db');
const Modelos = require('./model');
const app = express();
app.set('port', 3001);
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/', require('./route'));
//aqui irian las rutas


app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
    db.authenticate().then(() => {
        console.log('Conexión establecidad');
        Modelos.CrearModelos();
    })
        .catch((error) => {
            console.log('Error al conectar');
            console.log(error);
        })
});