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
    query('id'),
    ValidarAutenticado,
    controladorClientes.BuscarId);

ruta.get('/buscarNombre',
    ValidarAutenticado,
    query('nombre'),
    controladorClientes.BuscarNombre);

ruta.post('/guardar',
    body('nombre'),
    body('nombre'),
    body('apellido'),
    body('apellido'),
    controladorClientes.Guardar);

ruta.put('/editar',
    query('id'),
    body('nombre'),
    body('nombre'),
    body('apellido'),
    body('apellido'),
    controladorClientes.Editar);

ruta.delete('/eliminar',
    query('id'),
    controladorClientes.Eliminar);

ruta.post('/imagen',
    uploadCliente.single('img'),
    controladorClientes.RecibirImagen);

module.exports = ruta;