const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');
const Combo = require('../model/PxCombo');

exports.Inicio = (req, res) => {
    const moduloCombo = {
        modulo: 'pxcombos',
        descripcion: 'Gestiona las operaciones con el modelo de combos',
        rutas: [
            {
                ruta: '/api/pxcombos/listar',
                descripcion: 'Listar los combos',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/pxcombos/guardar',
                descripcion: 'Guardar los datos de un combo',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/pxcombos/editar',
                descripcion: 'Modifica los datos de un combo',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/pxcombos/eliminar',
                descripcion: 'Elimina los datos de un combo',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloPxCombo);
}

exports.Listar = async (req, res) => {
    const listarPxCombo = await PxCombo.findAll();
    res.json(listarPxCombo);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarPxCombo = await PxCombo.findAll({
            where: {
                id
            }
        });
        res.json(listarPxCombo);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { idplato, idcombo } = req.body;
    if (!idplato || !idcombo ) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await PxCombo.create({
            idplato,
            idcombo
        }).then(data => {
            res.json({ msj: 'Registro guardado' });
        })
            .catch((er) => {
                res.json({ msj: 'Error al guardar el registro' });
            })
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { idcombo, idplato} = req.body;
    if (!idcombo || !idplato  || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarPxCombo = await Combo.findOne({ where: { id: id } });
        if (!buscarPxCombo) {
            res.send('El id del cliente no existe');
        } else {
            buscarPxCombo.idcombo = idcombo;
            buscarPxCombo.idplato = idplato;
            await buscarPxCombo.save()
                .then((data) => {
                    console.log(data);
                    res.send('Actualizado correctamente');
                })
                .catch((er) => {
                    console.log(er);
                    res.send('Error al actualizar');
                });
        }
    }
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Combo.destroy({ where: { id: id } })
            .then((data) => {
                if(data==0){
                    res.send('El id no existe');
                } else {
                res.send('Registros eliminados: ' + data);
                }
            })
            .catch((er) => {
                console.log(er);
                res.send('Error al eliminar');
            })
    }
}