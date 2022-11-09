const { Router } = require('express');
const controladorPxCombo = require('../controller/PlatoCombo');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/',
    controladorPxCombo.Inicio);

ruta.get('/listar',
    controladorPxCombo.Listar);

ruta.post('/guardar',
    query('ComboId').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    query('MenuId').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorPxCombo.Guardar);

ruta.post('/editar',
    query('ComboId').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    query('MenuId').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorPxCombo.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorPxCombo.Eliminar);

module.exports = ruta;