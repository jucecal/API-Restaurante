const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const controladorClientes = require('../controller/Clientes');
const { ValidarAutenticado } = require('../config/passport');
const { body, query } = require('express-validator');

const storageCliente = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/clientes'));
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/', '.'));
    }
});
const uploadCliente = multer({ storage: storageCliente });

const ruta = Router();

ruta.get('/', controladorClientes.Inicio);

ruta.get('/listar', ValidarAutenticado, controladorClientes.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'), 
    ValidarAutenticado,
    controladorClientes.BuscarId);

ruta.get('/buscarNombre',
    ValidarAutenticado,
    controladorClientes.BuscarNombre);

ruta.post('/guardar',
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
    controladorClientes.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
    controladorClientes.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorClientes.Eliminar);

ruta.post('/imagen',
    uploadCliente.single('img'),
    controladorClientes.RecibirImagen);
    
module.exports = ruta;