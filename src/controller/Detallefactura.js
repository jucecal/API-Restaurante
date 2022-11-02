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
    const listarDetallefactura = await DetalleFactura.findAll();
    res.json(listarDetallefactura);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { cantidad, subTotal, estado, ComboId, FacturaId, MenuId } = req.body;
        if (!cantidad || !subTotal || !estado || !ComboId || !FacturaId || !MenuId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            var buscarFactura = await Factura.findOne({ where: { id: FacturaId } });
            if (!buscarFactura) {
                res.send('El id de la factura no existe');
            } else {
                var buscarCombo = await Combo.findOne({ where: { id: ComboId } });
                if (!buscarCombo) {
                    res.send('El id del combo no existe');
                } else {
                    var buscarMenu = await Menu.findOne({ where: { id: MenuId } });
                    if (!buscarMenu) {
                        res.send('El id del menu no existe');
                    } else {
                        await DetalleFactura.create({
                            cantidad,
                            subTotal,
                            estado,
                            FacturaId,
                            ComboId,
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
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { cantidad, subTotal, estado, FacturaId, ComboId, MenuId } = req.body;
    if (!cantidad || !subTotal || !estado || !FacturaId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarDetallefactura = await Tipo.findOne({ where: { id: id } });
        if (!buscarDetallefacturas) {
            res.send('El id del detalle no existe');
        } else {
            var buscarFactura = await Factura.findOne({ where: { id: FacturaId } });
            if (!buscarFactura) {
                res.send('El id de la factura no existe');
            } else {
                var buscarCombo = await Combo.findOne({ where: { id: ComboId } });
                if (!buscarCombo) {
                    res.send('El id del combo no existe');
                } else {
                    var buscarMenu = await Menu.findOne({ where: { id: MenuId } });
                    if (!buscarMenu) {
                        res.send('El id del menu no existe');
                    } else {
                        buscarDetallefactura.cantidad = cantidad;
                        buscarDetallefactura.subTotal = subTotal;
                        buscarDetallefactura.estado = estado;
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