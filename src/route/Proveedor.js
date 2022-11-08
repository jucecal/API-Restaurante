const { Router } = require('express');
const controladorProveedor = require('../controller/Proveedor');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorProveedor.Inicio);

ruta.get('/listar', 
    controladorProveedor.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorProveedor.buscarId);

ruta.post('/guardar',
    controladorProveedor.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('proveedor').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del proveedor con una longitud de 3 - 50 caracteres'),
    controladorProveedor.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorProveedor.Eliminar);
module.exports = ruta;