const {Router} = require('express');
const controladorMenu = require('../controller/Menu')
const { body, query} = require('express-validator');
const ruta = Router();

ruta.get('/', controladorMenu.Inicio);

ruta.get('/listar', controladorMenu.Listar);

ruta.get('/buscarId', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorMenu.BuscarId);

ruta.get('/buscarNombre', 
query('nombre').isLength({min:3, max:50}).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
controladorMenu.BuscarNombre);

ruta.post('/guardar',
body('nombre').isLength({min:3, max:50}).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
body('precio').isNumeric({min:1}).withMessage('Solo se permiten letras para el nombre del producto'),
body('descripcion').isLength({min:3, max:250}).withMessage('Debe escribir la descripción del producto con una longitud de 3 - 250 caracteres'),
body('CategoriumId').isInt().withMessage('Solo se aceptan valores enteros para el id  de categoría'),
controladorMenu.Guardar);

ruta.put('/editar',
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('nombre').isLength({min:3, max:50}).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
body('precio').isNumeric({min:1}).withMessage('Solo se permiten letras para el nombre del producto'),
body('descripcion').isLength({min:3, max:250}).withMessage('Debe escribir la descripción del producto con una longitud de 3 - 250 caracteres'),
body('CategoriumId').isInt().withMessage('Solo se aceptan valores enteros para el id  de categoría'),
controladorMenu.Editar);

ruta.delete('/eliminar',
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorMenu.Eliminar);

module.exports = ruta;
