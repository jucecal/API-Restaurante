const Inventario = require('../model/Inventario');
const Sucursal = require('../model/Sucursal');
const Insumo = require('../model/Insumo');
const { validationResult } = require('express-validator');
const { request } = require('express');

exports.Inicio = (req, res) => {
    const moduloInventario = {
        modulo: 'inventario',
        descripcion: 'Gestiona las operaciones con el modelo de Sucursales',
        rutas: [
            {
                ruta: '/api/inventario/listar',
                descripcion: 'Listar el inventario',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/inventario/guardar',
                descripcion: 'Guardar producto en inventario',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/inventario/editar',
                descripcion: 'Modifica producto en inventario',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/inventario/eliminar',
                descripcion: 'Elimina producto en inventario',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloInventario);
}
exports.Listar = async (req, res) => {
    const listarInventario = await Inventario.findAll({
        attributes: [
            ['stock', 'Stock'],
            'InsumoId',
            'SucursalId'
        ],
        include: [
            {
                model: Sucursal,
                attributes: [
                    ['nombre', 'Sucursal']
                ]
            },
            {
                model: Insumo,
                attributes: [
                    ['nombre', 'Producto']
                ]
            }
        ]
    });
    res.json(listarInventario);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { stock, SucursalId, InsumoId } = req.body;
        if (!stock || !SucursalId || !InsumoId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
            if (!buscarSucursal) {
                res.send('El id de la sucursal no existe');
            } else {
                var buscarInsumo = await Insumo.findOne({ where: { id: InsumoId } });
                if (!buscarInsumo) {
                    res.send('El id del insumo no existe');
                } else {
                    await Inventario.create({
                        stock,
                        SucursalId,
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
                }
            }
        }
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { stock, SucursalId, InsumoId } = req.body;
    if (!stock || !SucursalId || !InsumoId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarInventario = await Inventario.findOne({ where: { id: id } });
        if (!buscarInventario) {
            res.send('El id del tipo no existe');
        } else {
            var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
            if (!buscarSucursal) {
                res.send('El id de la sucursal no existe');
            } else {
                var buscarInsumo = await Insumo.findOne({ where: { id: InsumoId } });
                if (!buscarInsumo) {
                    res.send('El id del insumo no existe');
                } else {
                    buscarInventario.stock = stock;
                    buscarInventario.SucursalId = SucursalId;
                    buscarInventario.InsumoId = InsumoId;
                    await buscarInventario.save()
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
        await Inventario.destroy({ where: { id: id } })
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