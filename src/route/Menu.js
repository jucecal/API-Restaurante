const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const controladorMenu = require('../controller/Menu')
const { body, query } = require('express-validator');

const storageMenu = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/menu'));
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/', '.'));
    }
});
const uploadMenu = multer({ storage: storageMenu });

const ruta = Router();

ruta.get('/',
    controladorMenu.Inicio);

ruta.get('/listar',
    controladorMenu.Listar);

ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorMenu.BuscarId);

ruta.get('/buscarNombre',
    query('nombre').isLength({ min: 1, max: 50 }).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
    controladorMenu.BuscarNombre);

ruta.get('/buscarporCategoria',
    query('nombre').isLength({ min: 1, max: 50 }).withMessage('Debe escribir el nombre de la categoria con una longitud de 3 - 50 caracteres'),
    controladorMenu.BuscarPorCategoria);

ruta.post('/guardar',
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
    body('precio').isNumeric({ min: 1 }).withMessage('Solo se permiten numeros mayores a 0 para el precio del producto'),
    body('descripcion').isLength({ min: 3, max: 250 }).withMessage('Debe escribir la descripción del producto con una longitud de 3 - 250 caracteres'),
    body('CategoriumId').isInt().withMessage('Solo se aceptan valores enteros para el id  de categoría'),
    controladorMenu.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
    body('precio').isNumeric({ min: 1 }).withMessage('Solo se permiten numeros mayores a 0 para el precio del producto'),
    body('descripcion').isLength({ min: 3, max: 250 }).withMessage('Debe escribir la descripción del producto con una longitud de 3 - 250 caracteres'),
    body('CategoriumId').isInt().withMessage('Solo se aceptan valores enteros para el id  de categoría'),
    controladorMenu.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorMenu.Eliminar);

ruta.post('/imagen',
    uploadMenu.single('img'),
    controladorMenu.RecibirImagen);

module.exports = ruta;
