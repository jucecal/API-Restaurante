const { Router } = require('express');
const controladorPxCombo = require('../controller/PlatoCombo');
const {body, query} = require('express-validator');
const ruta = Router();

ruta.get('/', controladorPxCombo.Inicio);

ruta.get('/listar', controladorPxCombo.Listar);

ruta.get('/buscarId', 
query('idcombo').isInt().withMessage('Solo se aceptan valores enteros para el id'),
query('idplato').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorPxCombo.buscarId);

ruta.post('/guardar', 
query('idcombo').isInt().withMessage('Solo se aceptan valores enteros para el id'),
query('idplato').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorPxCombo.Guardar);

ruta.delete('/eliminar', 
query('idcombo').isInt().withMessage('Solo se aceptan valores enteros para el id'),
query('idplato').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorPxCombo.Eliminar);
module.exports=ruta;