const { Router } = require('express');
const controladorPxPlato = require('../controller/ProductoPlato');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/',
    controladorPxPlato.Inicio);

ruta.get('/listar',
    controladorPxPlato.Listar);

ruta.post('/guardar',
    body('cantidad').isInt().withMessage('Debe escribir cantidad de platos con una longitud de 3 - 50 caracteres'),
    controladorPxPlato.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('cantidad').isInt({ min: 3, max: 50 }).withMessage('Debe escribir cantidad de platos con una longitud de 3 - 50 caracteres'),
    controladorPxPlato.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorPxPlato.Eliminar);

module.exports = ruta;