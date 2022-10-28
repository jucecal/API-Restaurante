const { Router } = require('express');
const controladorTipo = require('../controller/Tipo');
const {body, query} = require('express-validator');
const ruta = Router();


ruta.get('/', controladorTipo.Inicio);

ruta.get('/listar', controladorTipo.Listar);

ruta.post('/guardar', body('tipo'), controladorTipo.Guardar);

ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('tipo'), controladorTipo.Editar);

ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorTipo.Eliminar);

module.exports=ruta;