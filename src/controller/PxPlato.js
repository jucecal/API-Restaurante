const PxPlato = require('../model/PxPlato');
const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');

exports.Inicio = (req, res) => {
    const moduloPxPlato = {
        modulo: 'pxplatos',
        descripcion: 'Gestiona las operaciones con el modelo de platos',
        rutas: [
            {
                ruta: '/api/pxplatos/listar',
                descripcion: 'Listar los Platps',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/pxplatos/guardar',
                descripcion: 'Guardar los datos del plato',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/pxplatos/editar',
                descripcion: 'Modifica los datos de los platos',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/pxplatos/eliminar',
                descripcion: 'Elimina los datos de los platos',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloPxPlato);
}

exports.Listar = async (req, res) => {
    const listarPxPlato = await PxPlato.findAll();
    res.json(listarPxPlato);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarPxPlato = await PxPlato.findAll({
            where: {
                id
            }
        });
        res.json(listarPxPlato);
    }
}

exports.buscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { cantidad } = req.query;
        const listarPxPlato = await PxPlato.findAll({
            attributes:['cantidad'],
            where: {
                [Op.and]: {
                    nombre: {
                        [Op.like]: cantidad
                    },
                    activo: true
                }
            }
        });
        res.json(listarPxPlato);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { cantidad} = req.body;
    if (!cantidad) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Sucursal.create({
            
            cantidad
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
    const { cantidad} = req.body;
    if (!cantidad || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarPxPlato = await PxPlato.findOne({ where: { id: id } });
        if (!buscarPxPlato) {
            res.send('El id del cliente no existe');
        } else {
            buscarPxPlato.cantidad = cantidad;
            
            await buscarPxPlato.save()
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
        await PxPlato.destroy({ where: { id: id } })
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