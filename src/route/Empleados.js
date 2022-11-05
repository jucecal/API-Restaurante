const { Router } = require('express');
const controladorEmpleado = require('../controller/Empleados');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorEmpleado.Inicio);

ruta.get('/listar', controladorEmpleado.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorEmpleado.buscarId);

ruta.post('/guardar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
    body('apellido').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el apellido del tipo con una longitud de 3 - 50 caracteres'),
    body('nombre').isAlpha().withMessage('Solo se puede ingresar letras de la a-z'),
    body('apellido').isAlpha().withMessage('Solo se puede ingresar letras de la a-z'),
    controladorEmpleado.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
    body('apellido').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el apellido del tipo con una longitud de 3 - 50 caracteres'),
    body('nombre').isAlpha().withMessage('Solo se puede ingresar letras de la a-z'),
    body('apellido').isAlpha().withMessage('Solo se puede ingresar letras de la a-z'),
    controladorEmpleado.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorEmpleado.Eliminar);
module.exports = ruta;