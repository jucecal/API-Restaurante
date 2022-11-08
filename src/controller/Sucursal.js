const Sucursal = require('../model/Sucursal');
const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');

exports.Inicio = (req, res) => {
    const moduloSucursal = {
        modulo: 'sucursales',
        descripcion: 'Gestiona las operaciones con el modelo de sucursales',
        rutas: [
            {
                ruta: '/api/sucursales/listar',
                descripcion: 'Listar los clientes',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/sucursales/guardar',
                descripcion: 'Guardar los datos de una sucursal',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/sucursales/editar',
                descripcion: 'Modifica los datos de una sucursal',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/sucursales/eliminar',
                descripcion: 'Elimina los datos de una sucursales',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloSucursal);
}

exports.Listar = async (req, res) => {
    const listarSucursal = await Sucursal.findAll({
        attributes: [
            ['id', 'ID Sucursal'],
            ['nombre', 'Nombre'],
            ['ubicacion', 'Ubicación'],
            ['telefono', 'Teléfono']
        ]
    });
    res.json(listarSucursal);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarSucursal = await Sucursal.findAll({
            attributes: [
                ['id', 'ID Sucursal'],
                ['nombre', 'Nombre'],
                ['ubicacion', 'Ubicación'],
                ['telefono', 'Teléfono']
            ],
            where: {
                id
            }
        });
        res.json(listarSucursal);
    }
}

exports.buscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.query;
        const listarSucursal = await Sucursal.findAll({
            attributes: [
                ['id', 'ID Sucursal'],
                ['nombre', 'Nombre'],
                ['ubicacion', 'Ubicación'],
                ['telefono', 'Teléfono']
            ],
            where: {
                nombre: {
                    [Op.like]: nombre
                }

            }
        });
        res.json(listarSucursal);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { nombre, ubicacion, telefono } = req.body;
    if (!nombre || !ubicacion || !telefono) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Sucursal.create({
            nombre,
            ubicacion,
            telefono
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
    const { nombre, ubicacion, telefono } = req.body;
    if (!nombre || !ubicacion || !telefono || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarSucursal = await Sucursal.findOne({ where: { id: id } });
        if (!buscarSucursal) {
            res.send('El id del cliente no existe');
        } else {
            buscarSucursal.nombre = nombre;
            buscarSucursal.ubicacion = ubicacion;
            buscarSucursal.telefono = telefono;
            await buscarSucursal.save()
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
        await Sucursal.destroy({ where: { id: id } })
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