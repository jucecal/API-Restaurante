const { Router } = require('express');
const controladorInsumo = require('../controller/Insumo');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorInsumo.Inicio);

ruta.get('/listar', controladorInsumo.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorInsumo.buscarId);

ruta.post('/guardar',
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre de la sucursal con una longitud de 3 - 50 caracteres'),
    controladorInsumo.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre de la sucursal con una longitud de 3 - 50 caracteres'),
    controladorInsumo.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorInsumo.Eliminar);
module.exports = ruta;