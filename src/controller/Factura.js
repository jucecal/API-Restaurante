const Factura = require('../model/Factura');
const DetalleFactura = require('../model/DetalleFactura');
const Mesa = require('../model/Mesas');
const Sucursal = require('../model/Sucursal');
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
                parametros: {
                    fecha: "Queda registrada la fecha de la factura. Obligatorio",
                    ISV: "Calculable con el subtotal del detalle venta. Obligatorio",
                    totalPagar: "Total del calculo en la tabla detalle venta. Obligatorio",
                    efectivo: "Cantidad de pago. Obligatorio",
                    cambio: "Cantidad sobrante del pago realizado. Obligatorio",
                    EmpleadoId: "Id del empleado que realiza la factura. Obligatorio",
                    ClienteId: "Id del cliente. Obligatorio",
                    MesaId: "Id de la mesa",
                    FormaPagoId: "Id de la forma de pago. Obligatorio",
                    SucusalId: "Id de la sucursal. Obligatorio"
                }
            },
            {
                ruta: '/api/facturas/buscarId',
                descripcion: 'Muestra un factura en específico según el id ingresado',
                metodo: 'GET',
                parametros: {
                    id: "Se necesita el id de la factura para poder determinar su venta. Obligatorio"
                }
            },
            {
                ruta: '/api/facturas/editar',
                descripcion: 'Modifica los datos de una factura',
                metodo: 'PUT',
                parametros: {
                    fecha: "Queda registrada la fecha de la factura. Obligatorio",
                    ISV: "Calculable con el subtotal del detalle venta. Obligatorio",
                    totalPagar: "Total del calculo en la tabla detalle venta. Obligatorio",
                    efectivo: "Cantidad de pago. Obligatorio",
                    cambio: "Cantidad sobrante del pago realizado. Obligatorio",
                    EmpleadoId: "Id del empleado que realiza la factura. Obligatorio",
                    ClienteId: "Id del cliente. Obligatorio",
                    MesaId: "Id de la mesa",
                    FormaPagoId: "Id de la forma de pago. Obligatorio",
                    SucusalId: "Id de la sucursal. Obligatorio"
                }
            },
            {
                ruta: '/api/facturas/eliminar',
                descripcion: 'Elimina los datos de una factura',
                metodo: 'DELETE',
                parametros: {
                    id: "Se necesita el id de la factura para poder eliminar su venta. Obligatorio"
                }
            }
        ]
    }
    res.json(moduloFactura);
}

exports.Listar = async (req, res) => {
    const listarFactura = await Factura.findAll({
        attributes: [
            ['id', 'Factura'],
            ['fecha', 'Fecha'],
            ['hora', 'Hora'],
            ['ISV', 'ISV'],
            ['totalPagar', 'Total a Pagar']
        ],
        include: [
            {
                model: Empleado,
                attributes: [
                    ['nombre', 'Empleado'],
                ]
            },
            {
                model: Cliente,
                attributes: [
                    ['nombre', 'Cliente'],
                ]
            },
            {
                model: Mesa,
                attributes: [
                    ['id', 'Mesa'],
                ]
            },
            {
                model: FormaPago,
                attributes: [
                    ['formaPago', 'Forma de Pago'],
                ]
            },
        ]
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
                ['id', 'Factura'],
                ['fecha', 'Fecha'],
                ['hora', 'Hora'],
                ['ISV', 'ISV'],
                ['totalPagar', 'Total a Pagar']
            ],
            where: {
                id
            },
            include: [
                {
                    model: Empleado,
                    attributes: [
                        ['nombre', 'Empleado'],
                    ]
                },
                {
                    model: Cliente,
                    attributes: [
                        ['nombre', 'Cliente'],
                    ]
                },
                {
                    model: Sucursal,
                    attributes: [
                        ['nombre', 'Sucursal'],
                    ]
                },
                {
                    model: Mesa,
                    attributes: [
                        ['id', 'Mesa'],
                    ]
                },
                {
                    model: FormaPago,
                    attributes: [
                        ['formaPago', 'Forma de Pago'],
                    ]
                },
            ]
        });
        res.json(listarFactura);
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        console.log(req);
        const { ISV, totalPagar, EmpleadoId, ClienteId, SucursalId, FormaPagoId, MesaId, hora } = req.body;
        if (!EmpleadoId || !ClienteId || !SucursalId || !FormaPagoId || !MesaId) {
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
                    var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
                    if (!buscarSucursal) {
                        res.send('El id de la forma de pago no existe');
                    } else {
                        var buscarFormaPago = await FormaPago.findOne({ where: { id: FormaPagoId } });
                        if (!buscarFormaPago) {
                            res.send('El id de la forma de pago no existe');
                        } else {
                            var buscarMesa = await Mesa.findOne({ where: { id: MesaId } });
                            if (!buscarMesa) {
                                res.send('El id de la mesa no existe');
                            } else {
                                await Factura.create({
                                    fecha: now(),
                                    hora,
                                    ISV,
                                    totalPagar: 0,
                                    //efectivo,
                                    //cambio: (efectivo - totalPagar),
                                    EmpleadoId,
                                    ClienteId,
                                    SucursalId,
                                    FormaPagoId,
                                    MesaId
                                }).then(data => {
                                    res.json({ msj: 'Registro guardado' });
                                })
                                    .catch((er) => {
                                        er.errors.forEach(element => {
                                            console.log(element.message);
                                            errores += element.message + '.';
                                        })
                                        res.json({ errores });
                                    })
                            }
                        }
                    }
                }
            }
        }

    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { EmpleadoId, ClienteId, SucursalId, FormaPagoId, MesaId } = req.body;
    if (!EmpleadoId || !ClienteId || !SucursalId || !FormaPagoId || !MesaId || !id) {
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
                    var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
                    if (!buscarSucursal) {
                        res.send('El id de la forma de pago no existe');
                    } else {
                        var buscarFormaPago = await FormaPago.findOne({ where: { id: FormaPagoId } });
                        if (!buscarFormaPago) {
                            res.send('El id de la forma de pago no existe');
                        } else {
                            var buscarMesa = await Mesa.findOne({ where: { id: MesaId } });
                            if (!buscarMesa) {
                                res.send('El id de la mesa no existe');
                            } else {
                                //buscarFactura.efectivo = efectivo;
                                //buscarFactura.cambio = (efectivo - totalPagar);
                                buscarFactura.EmpleadoId = EmpleadoId;
                                buscarFactura.ClienteId = ClienteId;
                                buscarFactura.SucursalId = SucursalId;
                                buscarFactura.FormaPagoId = FormaPagoId;
                                buscarFactura.MesaId = MesaId;
                                await buscarFactura.save()
                                    .then((data) => {
                                        console.log(data);
                                        res.send('Actualizado correctamente');
                                    })
                                    .catch((er) => {
                                        er.errors.forEach(element => {
                                            console.log(element.message);
                                            errores += element.message + '.';
                                        })
                                        res.json({ errores });
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