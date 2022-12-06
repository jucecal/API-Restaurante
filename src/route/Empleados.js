const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const controladorEmpleado = require('../controller/Empleados');
const { ValidarAutenticado } = require('../config/passport');
const { body, query } = require('express-validator');

const storageEmpleado = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/empleados'));
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/', '.'));
    }
});
const uploadEmpleado = multer({ storage: storageEmpleado });

const ruta = Router();

ruta.get('/', controladorEmpleado.Inicio);

ruta.get('/listar', ValidarAutenticado, controladorEmpleado.Listar);

ruta.get('/buscarId',
    ValidarAutenticado,
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorEmpleado.buscarId);

ruta.get('/buscarNombre',
    ValidarAutenticado,
    query('nombre'),
    controladorEmpleado.BuscarNombre);

ruta.post('/guardar',
    body('nombre'),
    body('apellido'),
    body('nombre'),
    body('apellido'),
    controladorEmpleado.Guardar);

ruta.put('/editar',
    query('id'),
    body('nombre'),
    body('apellido'),
    body('nombre'),
    body('apellido'),
    controladorEmpleado.Editar);

ruta.delete('/eliminar',
    query('id'),
    controladorEmpleado.Eliminar);

ruta.post('/imagen',
    uploadEmpleado.single('img'),
    controladorEmpleado.RecibirImagen);

module.exports = ruta;