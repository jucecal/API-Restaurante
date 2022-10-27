const { Router } = require('express');
const controladorCompra = require('../controller/Compra');
const {body, query} = require('express-validator');
const ruta = Router();
ruta.get('/', controladorCompra.Inicio);
ruta.get('/listar', controladorCompra.Listar);

ruta.get('/buscarId', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorCompra.buscarId);

ruta.get('/buscarFecha', 
query('fecha1').isDate().withMessage('Ingrese una fecha valida'),
query('fecha2').isDate().withMessage('Ingrese una fecha valida'),
controladorCompra.buscarFecha);

ruta.post('/guardar', 
body('fecha').isDate().withMessage('Ingrese una fecha valida'),
body('total_pagar').isNumeric().withMessage('Solo se aceptan valores numericos para el precio'),
controladorCompra.Guardar);

ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('fecha').isDate().withMessage('Ingrese una fecha valida'),
body('total_pagar').isNumeric().withMessage('Solo se aceptan valores numericos para el precio'),
controladorCompra.Editar);

ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorCompra.Eliminar);

module.exports=ruta;