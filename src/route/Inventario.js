const { Router } = require('express');
const controladorIxSucursal = require('../controller/Inventario');
const { body, query } = require('express-validator');
const ruta = Router();

ruta.get('/', controladorIxSucursal.Inicio);

ruta.get('/listar', controladorIxSucursal.Listar);

ruta.post('/guardar',
    body('stock').isInt().withMessage('Solo se aceptan valores enteros para el stock'),
    controladorIxSucursal.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('stock').isInt().withMessage('Solo se aceptan valores enteros para el stock'),
    controladorIxSucursal.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorIxSucursal.Eliminar);
module.exports = ruta;