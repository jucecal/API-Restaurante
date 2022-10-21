const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');
const Combo = require('../model/Combo');

exports.Inicio = (req, res) => {
    const moduloCombo = {
        modulo: 'combos',
        descripcion: 'Gestiona las operaciones con el modelo de combos',
        rutas: [
            {
                ruta: '/api/combos/listar',
                descripcion: 'Listar los combos',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/combos/guardar',
                descripcion: 'Guardar los datos de un combo',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/combos/editar',
                descripcion: 'Modifica los datos de un combo',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/combos/eliminar',
                descripcion: 'Elimina los datos de un combo',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloCombo);
}

exports.Listar = async (req, res) => {
    const listarCombo = await Combo.findAll();
    res.json(listarCombo);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarCombo = await Combo.findAll({
            where: {
                id
            }
        });
        res.json(listarCombo);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { combo, precio } = req.body;
    if (!combo || !precio ) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Combo.create({
            combo,
            precio
        }).then(data => {
            res.json({ msj: 'Registro guardado' });
        })
            .catch((er) => {
                res.json({ msj: 'Error al guardar el registro' });
            })
    }
}
