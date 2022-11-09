const { Router } = require('express');
const controladorDetallefactura = require('../controller/DetalleFactura');
const { ValidarAutenticado } = require('../config/passport');
const { body, query } = require('express-validator');
const ruta = Router();


ruta.get('/', controladorDetallefactura.Inicio);

ruta.get('/listar', controladorDetallefactura.Listar);

ruta.post('/guardarcombo',
    body('cantidad').isInt().withMessage('Solo se aceptan valores enteros para la cantidad'),
    controladorDetallefactura.GuardarCombo);

ruta.post('/guardarmenu',
    body('cantidad').isInt().withMessage('Solo se aceptan valores enteros para la cantidad'),
    controladorDetallefactura.GuardarMenu);

ruta.put('/editar',
    body('cantidad').isInt().withMessage('Solo se aceptan valores enteros para la cantidad'),
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('cantidad'), controladorDetallefactura.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorDetallefactura.Eliminar);

module.exports = ruta;