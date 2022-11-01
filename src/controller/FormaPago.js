const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');
const Formas_Pago = require('../model/Formas_Pago');

exports.Inicio = (req, res) => {
    const moduloFormas_Pago = {
        modulo: 'Formas_Pago',
        descripcion: 'Gestiona las operaciones con el modelo de Formas de Pago',
        rutas: [
            {
                ruta: '/api/formas_Pago/listar',
                descripcion: 'Listar las formas de pago',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/formas_Pago/guardar',
                descripcion: 'Guardar los datos de una formas de pago',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/formas_Pago/editar',
                descripcion: 'Modifica los datos de una formas de pago',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/formas_Pago/eliminar',
                descripcion: 'Elimina los datos de una formas de pago',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloFormas_Pago);
}

exports.Listar = async (req, res) => {
    const listarformas_Pago = await formas_Pago.findAll();
    res.json(listarformas_Pago);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarFormas_Pago = await formas_Pago.findAll({
            where: {
                id
            }
        });
        res.json(listarformas_Pago);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { Formas_Pago } = req.body;
    if (!Formas_Pago) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Formas_Pago.create({
            formas_Pago
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
    const { formas_Pago} = req.body;
    if (!formas_Pago  || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarFormas_Pago = await Formas_Pago.findOne({ where: { id: id } });
        if (!buscarFormas_Pago) {
            res.send('El id del cliente no existe');
        } else {
            buscarFormas_Pago.formas_Pago = formas_Pago;
            await buscarFormas_Pago.save()
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
        await Formas_Pago.destroy({ where: { id: id } })
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