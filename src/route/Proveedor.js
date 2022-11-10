const { Router } = require('express');
const controladorProveedor = require('../controller/Proveedor');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/',
    controladorProveedor.Inicio);

ruta.get('/listar',
    controladorProveedor.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorProveedor.buscarId);

ruta.get('/buscarNombre',
    controladorProveedor.BuscarNombre);

ruta.post('/guardar',
    body('telefono').isLength(8).withMessage('Debe agregar un numero de teléfono valido (8 Caracteres)'),
    body('proveedor').isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo se permiten letras para el nombre del cargo'),
    controladorProveedor.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('proveedor').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del proveedor con una longitud de 3 - 50 caracteres'),
    body('proveedor').isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo se permiten letras para el nombre del cargo'),
    controladorProveedor.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorProveedor.Eliminar);
module.exports = ruta;