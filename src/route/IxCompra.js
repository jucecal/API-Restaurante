const { Router } = require('express');
const controladorIxCompra = require('../controller/IxCompra');
const {body, query} = require('express-validator');
const ruta = Router();
ruta.get('/', controladorIxCompra.Inicio);
ruta.get('/listar', controladorIxCompra.Listar);
ruta.get('/buscarId', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorIxCompra.buscarId);
ruta.get('/buscarnombre', 
query('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre de la sucursal con una longitud de 3 - 50 caracteres'),
controladorIxCompra.buscarNombre);
ruta.post('/guardar', 
body('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre de la sucursal con una longitud de 3 - 50 caracteres'),
controladorIxCompra.Guardar);
ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre de la sucursal con una longitud de 3 - 50 caracteres'),
controladorIxCompra.Editar);
ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorIxCompra.Eliminar);
module.exports=ruta;