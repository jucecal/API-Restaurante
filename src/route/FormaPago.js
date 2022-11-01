const { Router } = require('express');
const controladorFormaPago = require('../controller/FormaPago');
const {body, query} = require('express-validator');
const ruta = Router();

ruta.get('/', controladorFormaPago.Inicio);

ruta.get('/listar', controladorFormaPago.Listar);

ruta.get('/buscarId', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorFormaPago.buscarId);

ruta.post('/guardar', 
controladorFormaPago.Guardar);

ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorFormaPago.Editar);

ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorFormaPago.Eliminar);
module.exports=ruta;