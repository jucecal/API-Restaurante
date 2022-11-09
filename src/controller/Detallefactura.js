const DetalleFactura = require('../model/DetalleFactura');
const Combo = require('../model/Combo');
const Factura = require('../model/Factura');
const Menu = require('../model/Menu');
const { validationResult } = require('express-validator');
const { request } = require('express');

exports.Inicio = (req, res) => {
    const moduloDetallefactura = {
        modulo: 'detallefacturas',
        descripcion: 'Gestiona las operaciones con el modelo de Detalle Factura',
        rutas: [
            {
                ruta: '/api/detallefacturas/listar',
                descripcion: 'Listar los detalles de factura',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/detallefacturas/guardar',
                descripcion: 'Guardar los detalles de factura',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/detallefacturas/editar',
                descripcion: 'Modifica los detalles de factura',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/detallefacturas/eliminar',
                descripcion: 'Elimina los detalles de factura',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloDetallefactura);
}

exports.Listar = async (req, res) => {
    const listarDetallefactura = await DetalleFactura.findAll({
        attributes: [
            ['id', 'ID Detalle'],
            ['cantidad', 'Cantidad'],
            ['subtotal', 'Sub-Total']
        ],
        include: [
            {
                model: Factura,
                attributes: [
                    ['id', 'ID Factura']
                ]
            },
            {
                model: Combo,
                attributes: [
                    ['combo', 'Combo'],
                    ['precio', 'Precio']
                ]
            },
            {
                model: Menu,
                attributes: [
                    ['nombre', 'Nombre'],
                    ['precio', 'Precio']
                ]
            }
        ]
    });

    res.json(listarDetallefactura);
}

exports.GuardarCombo = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { cantidad, ComboId, FacturaId } = req.body;
        if (!cantidad || !FacturaId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            let buscarFactura = await Factura.findOne({ where: { id: FacturaId } });
            if (!buscarFactura) {
                res.send('El id de la factura no existe');
            } else {
                let buscarCombo = await Combo.findOne({ where: { id: ComboId } });
                if (!buscarCombo) {
                    res.send('El id del combo no existe');
                } else {
                    await DetalleFactura.create({
                        cantidad,
                        subTotal: (buscarCombo.precio * cantidad),
                        FacturaId,
                        ComboId
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

exports.GuardarMenu = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { cantidad, FacturaId, MenuId } = req.body;
        if (!cantidad || !FacturaId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            let buscarFactura = await Factura.findOne({ where: { id: FacturaId } });
            if (!buscarFactura) {
                res.send('El id de la factura no existe');
            } else {
                let buscarMenu = await Menu.findOne({ where: { id: MenuId } });
                if (!buscarMenu) {
                    res.send('El id del menu no existe');
                } else {
                    await DetalleFactura.create({
                        cantidad,
                        subTotal: (buscarMenu.precio * cantidad),
                        FacturaId,
                        MenuId
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

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { cantidad, estado, FacturaId, ComboId, MenuId } = req.body;
    if (!cantidad || !estado || !FacturaId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        let buscarDetallefactura = await DetalleFactura.findOne({ where: { id: id } });
        if (!buscarDetallefactura) {
            res.send('El id del detalle no existe');
        } else {
            let buscarFactura = await Factura.findOne({ where: { id: FacturaId } });
            if (!buscarFactura) {
                res.send('El id de la factura no existe');
            } else {
                let buscarCombo = await Combo.findOne({ where: { id: ComboId } });
                if (!buscarCombo) {
                    res.send('El id del combo no existe');
                } else {
                    let buscarMenu = await Menu.findOne({ where: { id: MenuId } });
                    if (!buscarMenu) {
                        res.send('El id del menu no existe');
                    } else {
                        buscarDetallefactura.cantidad = cantidad;
                        buscarDetallefactura.subTotal = (buscarCombo.precio * cantidad) + (buscarMenu.precio * cantidad);
                        buscarDetallefactura.FacturaId = FacturaId;
                        buscarDetallefactura.ComboId = ComboId;
                        buscarDetallefactura.MenuId = MenuId;
                        await buscarDetallefactura.save()
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

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await DetalleFactura.destroy({ where: { id: id } })
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