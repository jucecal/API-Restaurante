const { Router } = require('express');
const controladorCombo = require('../controller/Combo');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorCombo.Inicio);

ruta.get('/listar', controladorCombo.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorCombo.buscarId);

ruta.post('/guardar',
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del combo con una longitud de 3 - 50 caracteres'),
    controladorCombo.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del combo con una longitud de 3 - 50 caracteres'),
    controladorCombo.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorCombo.Eliminar);
module.exports = ruta;