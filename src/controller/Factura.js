const Factura = require('../model/Factura');
const Mesa = require('../model/Mesas');
const Reservacion = require('../model/Reservaciones');
const Cliente = require('../model/Clientes');
const FormaPago = require('../model/FormaPago');
const Empleado = require('../model/Empleados');
const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op, Model } = require('sequelize');
const { now } = require('moment');

exports.Inicio = (req, res) => {
    const moduloFactura = {
        modulo: 'facturas',
        descripcion: 'Gestiona las operaciones con el modelo de factura',
        rutas: [
            {
                ruta: '/api/facturas/listar',
                descripcion: 'Listar las facturas',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/facturas/guardar',
                descripcion: 'Guardar los datos de una factura',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/facturas/editar',
                descripcion: 'Modifica los datos de una factura',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/facturas/eliminar',
                descripcion: 'Elimina los datos de una factura',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloFactura);
}

exports.Listar = async (req, res) => {
    const listarFactura = await Factura.findAll({
        attributes: [
                    ['id', 'ID Factura'], 
                    ['fecha', 'Fecha de Factura'], 
                    ['ISV', 'ISV'],
                    ['totalPagar', 'Total a Pagar'], 
                    ['efectivo', 'Efectivo'], 
                    ['cambio', 'Cambio'],
                    ['MesaId', 'ID Mesa'],
                    ['ReservacioneId', 'ID Reservación'],
                    ['ClienteId', 'ID Cliente'],
                    ['FormaPago', 'Forma de Pago'],
                    ['EmpleadoId', 'ID Empleado'],
                ],
        include: [{ 
            model: Insumo, attributes: [['nombre', 'Producto'], 
                                        ['precioUnitario', 'Precio']]
        }]
    });
    res.json(listarFactura);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarSucursal = await Factura.findAll({
            attributes: [
                ['id', 'ID Factura'], 
                ['fecha', 'Fecha de Factura'], 
                ['ISV', 'ISV'],
                ['totalPagar', 'Total a Pagar'], 
                ['efectivo', 'Efectivo'], 
                ['cambio', 'Cambio'],
                ['MesaId', 'ID Mesa'],
                ['ReservacioneId', 'ID Reservación'],
                ['ClienteId', 'ID Cliente'],
                ['FormaPago', 'Forma de Pago'],
                ['EmpleadoId', 'ID Empleado']
            ],
            include: [{ 
                model: Insumo, attributes: [
                    ['nombre', 'Producto'], 
                    ['precioUnitario', 'Precio']
                ]
            }],
            where: {
                id
            }
        });
        res.json(listarFactura);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { fecha, ISV, totalPagar, efectivo, cambio, EmpleadoId, ClienteId, FormaPagoId, ReservacioneId, MesaId } = req.body;
    if (!fecha || !ISV || !totalPagar || !efectivo || !EmpleadoId || !ClienteId || !FormaPagoId || !MesaId) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarEmpleado = await Empleado.findOne({ where: { id: EmpleadoId } });
        if (!buscarEmpleado) {
            res.send('El id del empleado no existe');
        } else {
            var buscarCliente = await Cliente.findOne({ where: { id: ClienteId } });
            if (!buscarCliente) {
                res.send('El id del cliente no existe');
            } else {
                var buscarFormaPago = await FormaPago.findOne({ where: { id: FormaPagoId } });
                if (!buscarFormaPago) {
                    res.send('El id de la forma de pago no existe');
                } else {
                    var buscarMesa = await Mesa.findOne({ where: { id: MesaId } });
                    if (!buscarMesa) {
                        res.send('El id de la mesa no existe');
                    } else {
                        var buscarReservacion = await Reservacion.findOne({ where: { id: ReservacioneId } });
                        if (!buscarReservacion) {
                            res.send('El id de la reservacion no existe');
                        } else {
                            await Factura.create({
                                fecha,
                                ISV,
                                totalPagar,
                                efectivo,
                                cambio,
                                EmpleadoId,
                                ClienteId,
                                FormaPagoId,
                                MesaId,
                                ReservacioneId
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
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { fecha, ISV, totalPagar, efectivo, cambio, EmpleadoId, ClienteId, FormaPagoId, ReservacioneId, MesaId } = req.body;
    if (!fecha || !ISV || !totalPagar || !efectivo || !EmpleadoId || !ClienteId || !FormaPagoId || !MesaId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarFactura = await Factura.findOne({ where: { id: id } });
        if (!buscarFactura) {
            res.send('El id de la factura no existe');
        } else {
            var buscarEmpleado = await Empleado.findOne({ where: { id: EmpleadoId } });
            if (!buscarEmpleado) {
                res.send('El id del empleado no existe');
            } else {
                var buscarCliente = await Cliente.findOne({ where: { id: ClienteId } });
                if (!buscarCliente) {
                    res.send('El id del cliente no existe');
                } else {
                    var buscarFormaPago = await FormaPago.findOne({ where: { id: FormaPagoId } });
                    if (!buscarFormaPago) {
                        res.send('El id de la forma de pago no existe');
                    } else {
                        var buscarMesa = await Mesa.findOne({ where: { id: MesaId } });
                        if (!buscarMesa) {
                            res.send('El id de la mesa no existe');
                        } else {
                            var buscarReservacion = await Reservacion.findOne({ where: { id: ReservacioneId } });
                            if (!buscarReservacion) {
                                res.send('El id de la reservacion no existe');
                            } else {
                                buscarFactura.ISV = ISV;
                                buscarFactura.totalPagar = totalPagar;
                                buscarFactura.efectivo = efectivo;
                                buscarFactura.cambio = cambio;
                                buscarFactura.EmpleadoId = EmpleadoId;
                                buscarFactura.ClienteId = ClienteId;
                                buscarFactura.FormaPagoId = FormaPagoId;
                                buscarFactura.MesaId = MesaId;
                                buscarFactura.ReservacioneId = ReservacioneId;
                                await buscarFactura.save()
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
        }
    }
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Factura.destroy({ where: { id: id } })
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