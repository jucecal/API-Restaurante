const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');
const PlatoCombo = require('../model/PlatoCombo');
const Combo = require('../model/Combo');
const Menu = require('../model/Menu');

exports.Inicio = (req, res) => {
    const moduloPlatoCombo = {
        modulo: 'pxcombos',
        descripcion: 'Gestiona las operaciones con el modelo de combos',
        rutas: [
            {
                ruta: '/api/pxcombos/listar',
                descripcion: 'Listar los combos',
                metodo: 'GET',
                parametros: 'Dato que se manda para poder listar los combos'
            },
            {
                ruta: '/api/pxcombos/guardar',
                descripcion: 'Guardar los datos de un combo',
                metodo: 'POST',
                parametros: 'Se guardan los datos de un combo'
            },
            {
                ruta: '/api/pxcombos/editar',
                descripcion: 'Modifica los datos de un combo',
                metodo: 'PUT',
                parametros: 'Se editan los combos ya establecidos'
            },
            {
                ruta: '/api/pxcombos/eliminar',
                descripcion: 'Elimina los datos de un combo',
                metodo: 'DELETE',
                parametros: 'Se elimina algun combo ya guardado'
            }
        ]
    }
    res.json(moduloPlatoCombo);
}

exports.Listar = async (req, res) => {
    const listarPxCombo = await PlatoCombo.findAll({
        attributes: [
            ['id', 'ID Platos y Combos'],
            ['ComboId', 'ID Combo'],
            ['MenuId', 'Cantidad']
        ],
        include: [
            {
                model: Menu,
                attributes: [
                    ['nombre', 'Nombre']
                ]
            },
            {
                model: Combo,
                attributes: [
                    ['combo', 'Combo']
                ]
            }
        ]
    });
    res.json(listarPxCombo);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else{
        console.log(req);
        const { ComboId, MenuId } = req.body;
    if (!ComboId || !MenuId) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarCombo = await Combo.findOne({ where: { id: ComboId } });
        if (!buscarCombo) {
            res.send('El id del combo no existe');
        } else {
            var buscarMenu = await Menu.findOne({ where: { id: MenuId } });
            if (!buscarMenu) {
                res.send('El id del menu no existe');
            } else {
                await PlatoCombo.create({
                    ComboId,
                    MenuId
                }).then(data => {
                    res.json({ msj: 'Registro guardado' });
                })
                    .catch((er) => {
                        res.json({ msj: 'Error al guardar el registro' });
                    })
            }
        }
    }

    }
    
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { ComboId, MenuId } = req.body;
    if (!ComboId || !MenuId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarPxCombo = await PlatoCombo.findOne({ where: { id: id } });
        if (!buscarPxCombo) {
            res.send('El id del cliente no existe');
        } else {
            var buscarCombo = await Combo.findOne({ where: { id: ComboId } });
            if (!buscarCombo) {
                res.send('El id del combo no existe');
            } else {
                var buscarMenu = await Menu.findOne({ where: { id: MenuId } });
                if (!buscarMenu) {
                    res.send('El id del menu no existe');
                } else {
                    buscarPxCombo.ComboId = ComboId;
                    buscarPxCombo.MenuId = MenuId;
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
    }
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await PlatoCombo.destroy({ where: { id: id } })
            .then((data) => {
                if (data == 0) {
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