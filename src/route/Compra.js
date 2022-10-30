const { Router } = require('express');
const controladorCompra = require('../controller/Compra');
const {body, query} = require('express-validator');
const ruta = Router();

ruta.get('/', controladorCompra.Inicio);

ruta.get('/listar', controladorCompra.Listar);

ruta.get('/buscarId', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorCompra.buscarId);

ruta.get('/buscarFecha', 
query('fecha1').isDate().withMessage('Ingrese una fecha valida en el formato año,mes,día'),
query('fecha2').isDate().withMessage('Ingrese una fecha valida en el formato año,mes,día'),
controladorCompra.buscarFecha);

ruta.get('/buscarporSucursal', 
query('nombre').isLength({min: 1, max: 50}).withMessage('Debe escribir el nombre de la sucursal con una longitud de 1 - 50 caracteres'),
controladorCompra.BuscarPorSucursal);

ruta.post('/guardar', 
body('fecha').isDate().withMessage('Ingrese una fecha valida'),
body('total_pagar').isNumeric().withMessage('Solo se aceptan valores numericos para el precio'),
body('SucursalId').isInt().withMessage('Solo se aceptan valores enteros para el id de sucursal'),
controladorCompra.Guardar);

ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('fecha').isDate().withMessage('Ingrese una fecha valida'),
body('total_pagar').isNumeric().withMessage('Solo se aceptan valores numericos para el precio'),
body('SucursalId').isInt().withMessage('Solo se aceptan valores enteros para el id de sucursal'),
controladorCompra.Editar);

ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorCompra.Eliminar);

module.exports=ruta;