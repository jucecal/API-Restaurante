const { Router } = require('express');
const controladorCategoria = require('../controller/Categoria');
const { body, query } = require('express-validator');
const ruta = Router();


ruta.get('/', controladorCategoria.Inicio);

ruta.get('/listar', controladorCategoria.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorCategoria.buscarId);

ruta.post('/guardar',
    body('categoria').isLength({ min: 3, max: 50 }).withMessage('Debe escribir la categoria con una longitud de 3 - 50 caracteres'),
    controladorCategoria.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('categoria').isLength({ min: 3, max: 50 }).withMessage('Debe escribir la categoria con una longitud de 3 - 50 caracteres'),
    controladorCategoria.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorCategoria.Eliminar);
module.exports = ruta;