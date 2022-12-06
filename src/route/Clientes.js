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

ruta.get('/',
    controladorClientes.Inicio);

ruta.get('/listar',
    ValidarAutenticado,
    controladorClientes.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    ValidarAutenticado,
    controladorClientes.BuscarId);

ruta.get('/buscarNombre',
    ValidarAutenticado,
    query('nombre'),
    controladorClientes.BuscarNombre);

ruta.post('/guardar',
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del cliente con una longitud de 3 - 50 caracteres'),
    body('nombre').isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo se permiten letras para el nombre del cliente'),
    body('apellido').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el apellido del cliente con una longitud de 3 - 50 caracteres'),
    body('apellido').isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo se permiten letras para el apellido del cliente'),
    controladorClientes.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del cliente con una longitud de 3 - 50 caracteres'),
    body('nombre').isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo se permiten letras para el nombre del cliente'),
    body('apellido').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el apellido del cliente con una longitud de 3 - 50 caracteres'),
    body('apellido').isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo se permiten letras para el apellido del cliente'),
    controladorClientes.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorClientes.Eliminar);

ruta.post('/imagen',
    uploadCliente.single('img'),
    controladorClientes.RecibirImagen);

module.exports = ruta;