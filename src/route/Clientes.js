const { Router } = require('express');
const controladorClientes = require('../controller/Clientes');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorClientes.Inicio);

ruta.get('/listar', controladorClientes.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorClientes.BuscarId);

ruta.get('/buscarNombre',
    controladorClientes.BuscarNombre);

ruta.post('/guardar',
    body('nombres').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
    controladorClientes.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
    controladorClientes.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorClientes.Eliminar);
    
module.exports = ruta;