const { Router } = require('express');
const controladorEmpleado = require('../controller/Empleados');
const {body, query} = require('express-validator');
const ruta = Router();

ruta.get('/', controladorEmpleado.Inicio);

ruta.get('/listar', controladorEmpleado.Listar);

ruta.get('/buscarId', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorEmpleado.buscarId);

ruta.post('/guardar', 
controladorEmpleado.Guardar);

ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorEmpleado.Editar);

ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorEmpleado.Eliminar);
module.exports=ruta;