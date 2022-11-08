const { Router } = require('express');
const controladorDetallefactura = require('../controller/DetalleFactura');
const { ValidarAutenticado } = require('../config/passport');
const { body, query } = require('express-validator');
const ruta = Router();


ruta.get('/', controladorDetallefactura.Inicio);

ruta.get('/listar', ValidarAutenticado, controladorDetallefactura.Listar);

ruta.post('/guardar', body('cantidad'), controladorDetallefactura.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('cantidad'), controladorDetallefactura.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorDetallefactura.Eliminar);

module.exports = ruta;