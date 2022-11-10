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
                parametros: {
                    nombre: "Necesario para poder identificar una sucursal asignada a empleado e inventario. Obligatorio",
                    ubicacion: "Ubicacion de la sucursal. Obligatorio",
                    telefono: "Teléfono de cada sucursal. Obligatorio"
                }
            },
            {
                ruta: '/api/sucursales/buscarId',
                descripcion: 'Muestra un surcursal en específico según el id ingresado',
                metodo: 'GET',
                parametros: {
                    id: "Buscar una sucursal específica por su id. Obligatorio"
                }
            },

            {
                ruta: '/api/surcursales/buscarNombre',
                descripcion: 'Muestra el o los sucursales que coincidan con el nombre ingresado',
                metodo: 'GET',
                parametros: {
                    nombre: "Buscar una sucursal por el nombre de esta. Obligatorios"
                }
            },
            {
                ruta: '/api/sucursales/editar',
                descripcion: 'Modifica los datos de una sucursal',
                metodo: 'PUT',
                parametros: {
                    nombre: "Necesario para poder identificar una sucursal asignada a empleado e inventario. Obligatorio",
                    ubicacion: "Ubicacion de la sucursal. Obligatorio",
                    telefono: "Teléfono de cada sucursal. Obligatorio"
                }
            },
            {
                ruta: '/api/sucursales/eliminar',
                descripcion: 'Elimina los datos de una sucursales',
                metodo: 'DELETE',
                parametros: {
                    id: "Eliminar una sucursal específica por su id. Obligatorio"
                }
            }
        ]
    }
    res.json(moduloSucursal);
}

exports.Listar = async (req, res) => {
    const listarSucursal = await Sucursal.findAll({
        attributes: [
            ['id', 'Id'],
            ['nombre', 'Sucursal'],
            ['ubicacion', 'Ubicación'],
            ['telefono', 'Teléfono']
        ]
    });
    res.json(listarSucursal);
}

exports.buscarId = async (req, res) => {
    const { id } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        var buscarSucursal = await Sucursal.findOne({ where: { id: id } });
        if (!buscarSucursal) {
            res.send('El id de la sucursal no existe');
        } else {
            const listarSucursal = await Sucursal.findOne({
                attributes: [
                    ['id', 'Id'],
                    ['nombre', 'Sucursal'],
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
}

exports.buscarNombre = async (req, res) => {
    const { nombre } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        var buscarSucursal = await Sucursal.findOne({ where: { nombre: nombre } });
        if (!buscarSucursal) {
            res.send('La sucursal no existe');
        } else {
            const listarSucursal = await Sucursal.findOne({
                attributes: [
                    ['id', 'Id'],
                    ['nombre', 'Sucursal'],
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
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
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
                    var errores = '';
                    er.errors.forEach(element => {
                        console.log(element.message)
                        errores += element.message + '. ';
                    });
                    res.json({ errores });
                })
        }
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
                    var errores = '';
                    er.errors.forEach(element => {
                        console.log(element.message)
                        errores += element.message + '. ';
                    });
                    res.json({ errores });
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