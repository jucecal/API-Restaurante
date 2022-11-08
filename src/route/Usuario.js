const { Router } = require('express');
const controladorUsuario = require('../controller/Usuario');
const { body, query } = require('express-validator');
const { ValidarAutenticado } = require('../config/passport');
const ruta = Router();

ruta.get('/', controladorUsuario.Inicio);

ruta.get('/listar', ValidarAutenticado, controladorUsuario.Listar);

ruta.get('/buscarId',
    ValidarAutenticado,
    controladorUsuario.BuscarId)

ruta.get('/buscarNombre',
    ValidarAutenticado,
    controladorUsuario.BuscarNombre)

ruta.post('/guardar', 
    body('nombre'), 
    controladorUsuario.Guardar);

ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre'), controladorUsuario.Editar);

ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorUsuario.Eliminar);

module.exports = ruta;