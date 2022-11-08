const { Router } = require('express');
const controladorFactura = require('../controller/Factura');
const { ValidarAutenticado } = require('../config/passport');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorFactura.Inicio);

ruta.get('/listar', ValidarAutenticado, controladorFactura.Listar);

ruta.get('/buscarId',
    ValidarAutenticado,
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorFactura.buscarId);

ruta.post('/guardar',
    controladorFactura.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorFactura.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorFactura.Eliminar);

module.exports = ruta;