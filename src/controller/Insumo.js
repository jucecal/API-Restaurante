const Insumo = require('../model/Insumo');
const Tipo = require('../model/Tipo');
const Proveedor = require('../model/Proveedor');
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
                parametros: {
                    nombre: "Nombre del producto. Obligatorio",
                    marca: "Marca del producto. Obligatorio",
                    fechaVencimiento: "Fecha de vencimiento",
                    precioUnitario: "Precio Unitario. Obligatorio",
                    TipoId: "Id del tipo de producto. Obligatorio",
                    ProveedorId: "Id del proveedor. Obligatorio"
                }
            },
            {
                ruta: '/api/insumos/buscarId',
                descripcion: 'Muestra un cargo en específico según el id ingresado',
                metodo: 'GET',
                parametros: {
                    id: "Realizar una busqueda especifica de un producto por su id"
                }
            },
            {
                ruta: '/api/cargos/buscarNombre',
                descripcion: 'Muestra el o los nombres que coincidan con el nombre ingresado',
                metodo: 'GET',
                parametros: {
                    nombre: "Realizar una busqueda especifica de un producto por su id"
                }
            },
            {
                ruta: '/api/insumos/editar',
                descripcion: 'Modifica los datos de un insumo',
                metodo: 'PUT',
                parametros: {
                    nombre: "Nombre del producto. Obligatorio",
                    marca: "Marca del producto. Obligatorio",
                    fechaVencimiento: "Fecha de vencimiento",
                    precioUnitario: "Precio Unitario. Obligatorio",
                    TipoId: "Id del tipo de producto. Obligatorio",
                    ProveedorId: "Id del proveedor. Obligatorio"
                }
            },
            {
                ruta: '/api/insumos/eliminar',
                descripcion: 'Elimina los datos de un insumo',
                metodo: 'DELETE',
                parametros: {
                    id: "Realizar una busqueda especifica de un producto por su id"
                }
            }
        ]
    }
    res.json(moduloInsumo);
}

exports.Listar = async (req, res) => {
    const listarInsumo = await Insumo.findAll({
        attributes: [
            ['id', 'ID Insumos'],
            ['nombre', 'Nombre'],
            ['marca', 'Marca'],
            ['fechaVencimiento', 'Fecha de Vencimiento'],
            ['precioUnitario', 'Precio Unitario']
        ],
        include: [{
            model: Proveedor,
            attributes: [
                ['proveedor', 'Proveedor']
            ]
        },
        {
            model: Tipo,
            attributes: [
                ['tipo', 'Tipo Producto']
            ]
        }
        ]
    });
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
            attributes: [
                ['id', 'ID Insumos'],
                ['nombre', 'Nombre'],
                ['marca', 'Marca'],
                ['fechaVencimiento', 'Fecha de Vencimiento'],
                ['precioUnitario', 'Precio Unitario'],
            ],

            where: {
                id
            },
            include: [{
                model: Proveedor,
                attributes: [
                    ['proveedor', 'Proveedor']
                ]
            },
            {
                model: Tipo,
                attributes: [
                    ['tipo', 'Tipo Producto']
                ]
            }
            ]
        });
        res.json(listarInsumo);
    }
}

exports.BuscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.query;
        const listarInsumo = await Insumo.findAll({
            attributes: [
                ['id', 'ID Insumo'],
                ['nombre', 'Nombre'],
                ['marca', 'Marca'],
                ['fechaVencimiento', 'Fecha de Vencimiento'],
                ['precioUnitario', 'Precio Unitario'],
            ],
            where: {
                nombre: {
                    [Op.like]: nombre
                }
            },
            include: [{
                model: Proveedor,
                attributes: [
                    ['proveedor', 'Proveedor']
                ]
            },
            {
                model: Tipo,
                attributes: [
                    ['tipo', 'Tipo Producto']
                ]
            }
            ]
        });
        res.json(listarInsumo);
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        console.log(req);
        const { nombre, marca, fechaVencimiento, precioUnitario, TipoId, ProveedorId } = req.body;
        if (!nombre || !marca || !precioUnitario || !TipoId || !ProveedorId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            var buscarProveedor = await Proveedor.findOne({ where: { id: ProveedorId } });
            if (!buscarProveedor) {
                res.send('El id del proveedor no existe');
            } else {
                var buscarTipo = await Tipo.findOne({ where: { id: TipoId } });
                if (!buscarTipo) {
                    res.send('El id del tipo de producto no existe');
                } else {
                    await Insumo.create({
                        nombre,
                        marca,
                        fechaVencimiento,
                        precioUnitario,
                        TipoId,
                        ProveedorId
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

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { nombre, marca, fechaVencimiento, precioUnitario, TipoId, ProveedorId } = req.body;
    if (!nombre || !marca || !precioUnitario || !ProveedorId || !TipoId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarInsumo = await Insumo.findOne({ where: { id: id } });
        if (!buscarInsumo) {
            res.send('El id del insumo no existe');
        } else {
            var buscarProveedor = await Proveedor.findOne({ where: { id: ProveedorId } });
            if (!buscarProveedor) {
                res.send('El id del proveedor no existe');
            } else {
                var buscarTipo = await Tipo.findOne({ where: { id: TipoId } });
                if (!buscarTipo) {
                    res.send('El id del tipo de producto no existe');
                } else {
                    buscarInsumo.nombre = nombre;
                    buscarInsumo.marca = marca;
                    buscarInsumo.fechaVencimiento = fechaVencimiento;
                    buscarInsumo.precioUnitario = precioUnitario;
                    buscarInsumo.TipoId = TipoId;
                    buscarInsumo.ProveedorId = ProveedorId;
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
    }
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Insumo.destroy({ where: { id: id } })
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