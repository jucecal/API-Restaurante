const { Router } = require('express');
const controladorFormaPago = require('../controller/FormaPago');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/',
    controladorFormaPago.Inicio);

ruta.get('/listar',
    controladorFormaPago.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorFormaPago.BuscarId);

ruta.post('/guardar',
    body('formaPago').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre de la forma de pago con una longitud de 3 - 50 caracteres'),
    controladorFormaPago.Guardar);

ruta.put('/editar',
    body('formaPago').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre de la forma de pago con una longitud de 3 - 50 caracteres'),
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorFormaPago.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorFormaPago.Eliminar);
module.exports = ruta;