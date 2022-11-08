const { Router } = require('express');
const controladorReservaciones = require('../controller/Reservaciones');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorReservaciones.Inicio);

ruta.get('/listar', controladorReservaciones.Listar);

ruta.get('/buscarId', 
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),    
    controladorReservaciones.BuscarId);

ruta.post('/guardar',
    controladorReservaciones.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorReservaciones.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorReservaciones.Eliminar);
module.exports = ruta;