const { Router } = require('express');
const controladorReservaciones = require('../controller/Reservaciones');
const {body, query} = require('express-validator');
const ruta = Router();

ruta.get('/', controladorReservaciones.Inicio);

ruta.get('/listar', controladorReservaciones.Listar);

ruta.post('/guardar', 
body('fecha_hora'),
controladorReservaciones.Guardar);

ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('fecha_hora'),
controladorReservaciones.Editar);

ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorReservaciones.Eliminar);
module.exports=ruta;