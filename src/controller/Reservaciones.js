const Reservaciones = require('../model/Reservaciones');
const Clientes = require('../model/Clientes');
const Mesas = require('../model/Mesas');
const Sucursal = require('../model/Sucursal');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { request } = require('express');

exports.Inicio = (req, res) => {
    const moduloReservaciones = {
        modulo: 'reservaciones',
        descripcion: 'Gestiona las operaciones con el modelo de Reservaciones',
        rutas: [
            {
                ruta: '/api/reservaciones/listar',
                descripcion: 'Listar las Reservaciones',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/reservaciones/guardar',
                descripcion: 'Guardar las Reservaciones',
                metodo: 'POST',
                parametros: {
                    fechaHora: "Fecha y Hora de la reservación. Obligatorio",
                    ClienteId: "Id del cliente de la reservación. Obligatorio",
                    MesaId: "Id de la mesa de la reservación. Obligatorio",
                    SucursalId: "Id de la sucursal de la reservación. Obligatorio"
                }
            },
            {
                ruta: '/api/reservaciones/buscarId',
                descripcion: 'Muestra un cargo en específico según el id ingresado',
                metodo: 'GET',
                parametros: {
                    id: "Buscar un reservación por su id"
                }
            },
            {
                ruta: '/api/reservaciones/editar',
                descripcion: 'Modifica las Reservaciones',
                metodo: 'PUT',
                parametros: {
                    fechaHora: "Fecha y Hora de la reservación. Obligatorio",
                    ClienteId: "Id del cliente de la reservación. Obligatorio",
                    MesaId: "Id de la mesa de la reservación. Obligatorio",
                    SucursalId: "Id de la sucursal de la reservación. Obligatorio"
                }
            },
            {
                ruta: '/api/reservaciones/eliminar',
                descripcion: 'Elimina las Reservaciones',
                metodo: 'DELETE',
                parametros: {
                    id: "Eliminar un reservación por su id"
                }
            }
        ]
    }
    res.json(moduloReservaciones);
}

exports.Listar = async (req, res) => {
    const listarReservaciones = await Reservaciones.findAll({
        attributes: [
            ['id', 'Id'],
            ['fecha', 'Fecha'],
            ['hora', 'Hora']
        ],
        include: [
            {
                model: Sucursal,
                attributes: [
                    ['nombre', 'Sucursal']
                ]
            },
            {
                model: Mesas,
                attributes: [
                    ['id', 'Mesa']
                ]
            },
            {
                model: Clientes,
                attributes: [
                    ['nombre', 'Cliente'],
                    ['apellido', 'Apellido'],
                    ['telefono', 'Teléfono']
                ]
            }
        ]
    });
    res.json(listarReservaciones);
}

exports.BuscarId = async (req, res) => {
    const { id } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        var buscarReservacion = await Reservaciones.findOne({ where: { id: id } });
        if (!buscarReservacion) {
            res.send('El id de la reservación no existe');
        } else {
            const listarReservaciones = await Reservaciones.findOne({
                attributes: [
                    ['id', 'Id'],
                    ['fecha', 'Fecha'],
                    ['hora', 'Hora']
                ],
                where: {
                    id: id
                },
                include: [
                    {
                        model: Sucursal,
                        attributes: [
                            ['nombre', 'Sucursal']
                        ]
                    },
                    {
                        model: Mesas,
                        attributes: [
                            ['id', 'Mesa']
                        ]
                    },
                    {
                        model: Clientes,
                        attributes: [
                            ['nombre', 'Cliente'],
                            ['apellido', 'Apellido'],
                            ['telefono', 'Teléfono']
                        ]
                    }
                ]
            });
            res.json(listarReservaciones);
        }
    }
}

exports.BuscarPorCliente = async (req, res) => {
    const { nombre } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        var buscarCliente = await Clientes.findOne({ where: { nombre: nombre } });
        if (!buscarCliente) {
            res.send('No existe reservación de este cliente');
        } else {
            const listarReservaciones = await Reservaciones.findAll({
                attributes: [
                    ['id', 'Id'],
                    ['fecha', 'Fecha'],
                    ['hora', 'Hora']
                ],
                include: [
                    {
                        model: Sucursal,
                        attributes: [
                            ['nombre', 'Sucursal']
                        ]
                    },
                    {
                        model: Mesas,
                        attributes: [
                            ['id', 'Mesa']
                        ]
                    },
                    {
                        model: Clientes,
                        attributes: [
                            ['nombre', 'Cliente']
                        ],
                        where: {
                            nombre: {
                                [Op.like]: nombre
                            }
                        }
                    }
                ]
            });
            res.json(listarReservaciones);
        }
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { fecha, hora, ClienteId, MesaId, SucursalId } = req.body;
        if (!fecha || !hora || !ClienteId || !MesaId || !SucursalId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            var buscarCliente = await Clientes.findOne({ where: { id: ClienteId } });
            if (!buscarCliente) {
                res.send('El id del cliente no existe');
            } else {
                var buscarMesa = await Mesas.findOne({ where: { id: MesaId } });
                if (!buscarMesa) {
                    res.send('El id de la mesa no existe');
                } else {
                    var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
                    if (!buscarSucursal) {
                        res.send('El id de la sucursal no existe');
                    } else {
                        await Reservaciones.create({
                            fecha,
                            hora,
                            ClienteId,
                            MesaId,
                            SucursalId
                        }).then(data => {
                            res.json({ msj: 'Registro guardado' });
                        })
                            .catch((er) => {
                                var errores = '';
                                er.errors.forEach(element => {
                                    console.log(element.message);
                                    errores += element.message + '. ';
                                })
                                res.json({ errores });
                            })
                    }
                }
            }
        }
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { fecha, hora, ClienteId, MesaId, SucursalId } = req.body;
    if (!fecha || !hora || !ClienteId || !MesaId || !SucursalId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarReservacion = await Reservaciones.findOne({ where: { id: id } });
        if (!buscarReservacion) {
            res.send('El id de la reservación no existe');
        } else {
            var buscarCliente = await Clientes.findOne({ where: { id: ClienteId } });
            if (!buscarCliente) {
                res.send('El id del cliente no existe');
            } else {
                var buscarMesa = await Mesas.findOne({ where: { id: MesaId } });
                if (!buscarMesa) {
                    res.send('El id de la mesa no existe');
                } else {
                    var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
                    if (!buscarSucursal) {
                        res.send('El id de la sucursal no existe');
                    } else {
                        buscarReservacion.fecha = fecha;
                        buscarReservacion.hora = hora;
                        buscarReservacion.ClienteId = ClienteId;
                        buscarReservacion.MesaId = MesaId;
                        buscarReservacion.SucursalId = SucursalId;
                        await buscarReservacion.save()
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
        }
    }
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Reservaciones.destroy({ where: { id: id } })
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