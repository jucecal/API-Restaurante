const { Router } = require('express');
const controladorSucursal = require('../controller/Sucursal');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorSucursal.Inicio);

ruta.get('/listar', controladorSucursal.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorSucursal.buscarId);

ruta.get('/buscarnombre',
    query('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre de la sucursal con una longitud de 3 - 50 caracteres'),
    controladorSucursal.buscarNombre);

ruta.post('/guardar',
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre de la sucursal con una longitud de 3 - 50 caracteres'),
    controladorSucursal.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre de la sucursal con una longitud de 3 - 50 caracteres'),
    controladorSucursal.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorSucursal.Eliminar);
module.exports = ruta;