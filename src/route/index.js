const { Router } = require('express');
const controladorInicio = require('../controller/Inicio');
const ruta = Router();
ruta.get('/', controladorInicio.Inicio);

module.exports=ruta;