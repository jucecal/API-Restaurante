const DetalleCompra = require('../model/DetalleCompra');
const Insumo = require('../model/Insumo');
const Compra = require('../model/Compra');
const Inventario = require('../model/Inventario')
const { validationResult } = require('express-validator');
const { request } = require('express');

exports.Inicio = (req, res) => {
    const moduloDetalleCompra = {
        modulo: 'detallecompra',
        descripcion: 'Gestiona las operaciones con el modelo de Detalle Compra',
        rutas: [
            {
                ruta: '/api/detallecompra/listar',
                descripcion: 'Listar los detalles de compras',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/detallecompra/guardar',
                descripcion: 'Guardar los detalles de compras',
                metodo: 'POST',
                parametros: {
                    cantidad: "Cantidad de productos a comprar. Obligatorio",
                    observaciones: "Comentarios hacer de la compra"
                }
            },
            {
                ruta: '/api/detallecompra/editar',
                descripcion: 'Modifica los detalles de compras',
                metodo: 'PUT',
                parametros: {
                    cantidad: "Cantidad de productos a comprar. Obligatorio",
                    observaciones: "Comentarios hacer de la compra"
                }
            },
            {
                ruta: '/api/detallecompra/eliminar',
                descripcion: 'Elimina los detalles de compras',
                metodo: 'DELETE',
                parametros: {
                    id: "Se necesita el ID del detalle para poder eliminarlo. Obligatorio"
                }
            }
        ]
    }
    res.json(moduloDetalleCompra);
}

exports.Listar = async (req, res) => {
    const listarDetalleCompra = await DetalleCompra.findAll({
        attributes: [
            ['cantidad', 'Cantidad'],
            ['subTotal', 'SubTotal'],
            ['observaciones', 'Observaciones'],
            ['CompraId', 'Orden de Compra']
        ],
        include: [{
            model: Insumo,
            attributes: [
                ['nombre', 'Producto'],
                ['precioUnitario', 'Precio']
            ]
        }]
    });
    res.json(listarDetalleCompra);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { cantidad, observaciones, CompraId, InsumoId } = req.body;
        if (!cantidad || !observaciones || !CompraId || !InsumoId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            var buscarCompra = await Compra.findOne({ where: { id: CompraId } });
            if (!buscarCompra) {
                res.send('El id de la compra no existe');
            } else {
                var buscarInsumo = await Insumo.findOne({ where: { id: InsumoId } });
                if (!buscarInsumo) {
                    res.send('El id del insumo no existe');
                } else {
                    await DetalleCompra.create({
                        cantidad,
                        subTotal: buscarInsumo.precioUnitario * cantidad,
                        observaciones,
                        CompraId,
                        InsumoId
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

                    const buscarCompra = await Compra.findOne({
                        attributes: ['SucursalId'],
                        where: {
                            id: CompraId
                        }
                    });
                    var buscarInventario = await Inventario.findOne({ where: { InsumoId: InsumoId, SucursalId: buscarCompra.SucursalId } });
                    if (!buscarInventario) {
                        console.log('No existe en inventario');
                    } else {
                        buscarInventario.stock += cantidad
                        await buscarInventario.save()
                            .then((data) => {
                                console.log(data);
                                console.log('Error en inventario');
                            })
                            .catch((er) => {
                                console.log(er);
                                console.log('Error en inventario');
                            });
                    }

                    let buscarCompraTotal = await Compra.findOne({ where: { id: CompraId } });
                    if (!buscarCompraTotal) {
                        console.log('No existe Orden de Compra');
                    } else {
                        buscarCompraTotal.totalPagar += buscarInsumo.precioUnitario * cantidad,
                            await buscarCompraTotal.save()
                    }

                }
            }
        }
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { cantidad, observaciones, CompraId, InsumoId } = req.body;
    if (!cantidad || !observaciones || !CompraId || !InsumoId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarDetalleCompra = await DetalleCompra.findOne({ where: { id: id } });
        if (!buscarDetalleCompra) {
            res.send('El id del tipo no existe');
        } else {
            var buscarCompra = await Compra.findOne({ where: { id: CompraId } });
            if (!buscarCompra) {
                res.send('El id de la compra no existe');
            } else {
                var buscarInsumo = await Insumo.findOne({ where: { id: InsumoId } });
                if (!buscarInsumo) {
                    res.send('El id del insumo no existe');
                } else {
                    buscarDetalleCompra.cantidad = cantidad;
                    buscarDetalleCompra.observaciones = observaciones;
                    buscarDetalleCompra.subTotal = buscarInsumo.precioUnitario * cantidad;
                    buscarDetalleCompra.CompraId = CompraId;
                    buscarDetalleCompra.InsumoId = InsumoId;
                    await buscarDetalleCompra.save()
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
        await DetalleCompra.destroy({ where: { id: id } })
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