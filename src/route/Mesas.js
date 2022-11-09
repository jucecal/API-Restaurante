const { Router } = require('express');
const controladorMesas = require('../controller/Mesas');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/',
    controladorMesas.Inicio);

ruta.get('/listar',
    controladorMesas.Listar);

ruta.get('/buscarId',
    controladorMesas.BuscarId);

ruta.post('/guardar',
    body('capacidad').isLength({ min: 1, max: 5 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 5 caracteres'),
    controladorMesas.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('capacidad').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 5 caracteres'),
    controladorMesas.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorMesas.Eliminar);
module.exports = ruta;