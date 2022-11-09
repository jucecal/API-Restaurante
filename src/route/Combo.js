const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const controladorCombo = require('../controller/Combo');
const { body, query } = require('express-validator');

const storageCombo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/combos'));
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/', '.'));
    }
});
const uploadCombo = multer({ storage: storageCombo });

const ruta = Router();

ruta.get('/',
    controladorCombo.Inicio);

ruta.get('/listar',
    controladorCombo.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorCombo.buscarId);

ruta.get('/buscarNombre',
    controladorCombo.BuscarCombo);

ruta.post('/guardar',
    body('combo').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del combo con una longitud de 3 - 50 caracteres'),
    controladorCombo.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('combo').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del combo con una longitud de 3 - 50 caracteres'),
    controladorCombo.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorCombo.Eliminar);

ruta.post('/imagen',
    uploadCombo.single('img'),
    controladorCombo.RecibirImagen);

module.exports = ruta;