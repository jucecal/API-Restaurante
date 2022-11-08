const { validationResult } = require('express-validator');
const { request } = require('express');
const Combo = require('../model/Combo');
const MSJ = require('../components/mensaje');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
var errores = [];
var data = [];
var error = {
    msg: '',
    parametro: ''
};


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
    const listarCombo = await Combo.findAll({
        attributes: [
            ['id', 'ID Combo'],
            ['combo', 'Nombre'],
            ['precio', 'Precio']
        ]
    });
    res.json(listarCombo);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarCombo = await Combo.findOne({
            attributes: [
                ['id', 'ID Combo'],
                ['combo', 'Nombre'],
                ['precio', 'Precio']
            ],
            where: {
                id
            }
        });
        res.json(listarCombo);
    }
}

exports.BuscarCombo = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { combo } = req.query;
        const listarCombo = await Combo.findOne({
            attributes: [
                ['id', 'ID Combo'],
                ['combo', 'Nombre'],
                ['precio', 'Precio']
            ],
            where: {
                combo: {
                    [Op.like]: combo
                }
            },
        });
        res.json(listarCombo);
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        console.log(req);
        const { combo, precio } = req.body;
        if (!combo || !precio) {
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

}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { combo, precio } = req.body;
    if (!combo || !precio || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarCombo = await Combo.findOne({ where: { id: id } });
        if (!buscarCombo) {
            res.send('El id del combo no existe');
        } else {
            buscarCombo.combo = combo;
            buscarCombo.precio = precio;
            await buscarCombo.save()
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

exports.RecibirImagen = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.body;
    //console.log(req);
    console.log(filename);
    try {
        errores = [];
        data = [];
        var buscarCombo = await Combo.findOne({ where: { id } });
        if (!buscarCombo) {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/combos/' + filename));
            if (!buscarImagen)
                console.log('La imagen no existe');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/combos/' + filename));
                console.log('Imagen eliminada');
            }
            error.msg = 'El id del producto no existe. Se elimino la imagen enviada';
            error.parametro = 'id';
            errores.push(error);
            MSJ("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/combos/' + buscarCombo.imagen));
            if (!buscarImagen)
                console.log('No encontro la imagen');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/combos/' + buscarCombo.imagen));
                console.log('Imagen eliminada');
            }
            buscarCombo.imagen = filename;
            await buscarCombo.save()
                .then((data) => {
                    MSJ('Peticion ejecutada correctamente', 200, data, errores, res);
                })
                .catch((error) => {
                    errores.push(error);
                    MSJ('Peticion ejecutada correctamente', 200, [], errores, res);
                });
        }
    } catch (error) {
        console.log(error);
        errores.push(error);
        MSJ('Error al ejecutar la peticion', 500, [], errores, res);
    }
}