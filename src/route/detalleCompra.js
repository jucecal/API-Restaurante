const { Router } = require('express');
const controladorDetalleCompra = require('../controller/DetalleCompra');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorDetalleCompra.Inicio);

ruta.get('/listar', controladorDetalleCompra.Listar);

ruta.post('/guardar',
    body('cantidad').isInt().withMessage('Solo se aceptan valores enteros para la cantidad'),
    controladorDetalleCompra.Guardar);

ruta.put('/editar',
    body('cantidad').isInt().withMessage('Solo se aceptan valores enteros para la cantidad'),
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorDetalleCompra.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorDetalleCompra.Eliminar);

module.exports = ruta;