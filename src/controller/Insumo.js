const Insumo = require('../model/Insumo');
const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');

exports.Inicio = (req, res) => {
    const moduloInsumo = {
        modulo: 'insumos',
        descripcion: 'Gestiona las operaciones con el modelo de compras',
        rutas: [
            {
                ruta: '/api/insumos/listar',
                descripcion: 'Listar los insumos',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/insumos/guardar',
                descripcion: 'Guardar los datos de un insumo',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/insumos/editar',
                descripcion: 'Modifica los datos de un insumo',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/insumos/eliminar',
                descripcion: 'Elimina los datos de un insumo',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloInsumo);
}

exports.Listar = async (req, res) => {
    const listarInsumo = await Insumo.findAll();
    res.json(listarInsumo);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarInsumo = await Insumo.findAll({
            where: {
                id
            }
        });
        res.json(listarInsumo);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { nombre, marca, fechaVencimiento, precioUnitario } = req.body;
    if (!nombre || !marca || !fechaVencimiento || !precioUnitario) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Insumo.create({
            nombre,
            marca,
            fechaVencimiento,
            precioUnitario
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
    const { nombre, marca, fechaVencimiento, precioUnitario} = req.body;
    if (!nombre || !marca || !fechaVencimiento || !precioUnitario || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarInsumo = await Insumo.findOne({ where: { id: id } });
        if (!buscarInsumo) {
            res.send('El id del insumo no existe');
        } else {
            buscarInsumo.nombre = nombre;
            buscarInsumo.marca = marca;
            buscarInsumo.fechaVencimiento = fechaVencimiento;
            buscarInsumo.precioUnitario = precioUnitario;
            await buscarInsumo.save()
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
        await Insumo.destroy({ where: { id: id } })
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