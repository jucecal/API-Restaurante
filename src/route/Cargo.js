const { Router } = require('express');
const controladorCargos = require('../controller/Cargo')
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/',
    controladorCargos.Inicio);

ruta.get('/listar',
    controladorCargos.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorCargos.BuscarId);

ruta.get('/buscarNombre',
    query('nombre').isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo se permiten letras para el nombre del cargo'),
    controladorCargos.BuscarNombre);

ruta.post('/guardar',
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del cargo con una longitud de 3 - 50 caracteres'),
    body('nombre').isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo se permiten letras para el nombre del cargo'),
    controladorCargos.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del cargo con una longitud de 3 - 50 caracteres'),
    body('nombre').isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo se permiten letras para el nombre del cargo'),
    controladorCargos.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorCargos.Eliminar);

module.exports = ruta;
