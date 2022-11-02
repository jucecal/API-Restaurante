const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const controladorCompra = require('../controller/Compra');
const {body, query} = require('express-validator');

const storageCompras = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../public/img/compras'));
    },
    filename: function (req, file, cb){
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/','.'));
    }
});
const uploadCompras = multer({storage: storageCompras});

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
body('totalPagar').isNumeric().withMessage('Solo se aceptan valores numericos para el precio'),
body('SucursalId').isInt().withMessage('Solo se aceptan valores enteros para el id de sucursal'),
controladorCompra.Guardar);

ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('fecha').isDate().withMessage('Ingrese una fecha valida'),
body('totalPagar').isNumeric().withMessage('Solo se aceptan valores numericos para el precio'),
body('SucursalId').isInt().withMessage('Solo se aceptan valores enteros para el id de sucursal'),
controladorCompra.Editar);

ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorCompra.Eliminar);

ruta.post('/imagen', 
uploadCompras.single('img'), 
controladorCompra.RecibirImagen);

module.exports=ruta;