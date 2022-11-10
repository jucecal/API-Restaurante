const Compra = require('../model/Compra');
const Sucursal = require('../model/Sucursal');
const { validationResult } = require('express-validator');
const { request } = require('express');
const MSJ = require('../components/mensaje');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { now } = require('moment');
var errores = [];
var data = [];
var error = {
    msg: '',
    parametro: ''
};

exports.Inicio = (req, res) => {
    const moduloCompra = {
        modulo: 'compras',
        descripcion: 'Gestiona las operaciones con el modelo de compras',
        rutas: [
            {
                ruta: '/api/compras/listar',
                descripcion: 'Listar las compras realizadas',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/buscarId',
                descripcion: 'Muestra una compra con un Id específico',
                metodo: 'GET',
                parametros: {
                    id: "Se necesita para poder buscar una compra. Obligatorio"
                }
            },
            {
                ruta: '/api/compras/buscarFecha',
                descripcion: 'Lista las compras realizadas en un periodo de tiempo entre una fecha y otra',
                metodo: 'GET',
                parametros: {
                    fecha: "Se necesita para poder buscar una compra en una fecha específica. Obligatorio"
                }
            },
            {
                ruta: '/api/compras/buscarporSucursal',
                descripcion: 'Lista las compras realizadas en una sucursal en específico',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/recibirImagen',
                descripcion: 'almacena la imagen ingresada por el usuario',
                metodo: 'GET',
                parametros: {
                    img: "Comprabante de la orden de compra"
                }
            },
            {
                ruta: '/api/compras/guardar',
                descripcion: 'Guardar los datos de una compra',
                metodo: 'POST',
                parametros: {
                    fecha: "Se manda a la tabla de detalle de compra para que especifique la venta. Obligatorio",
                    SucursalId: "Id de la sucursal que realiza la compra. Obligatorio"
                }
            },
            {
                ruta: '/api/compras/editar',
                descripcion: 'Modificar los datos de una compra',
                metodo: 'PUT',
                parametros: {
                    fecha: "Se manda a la tabla de detalle de compra para que especifique la venta. Obligatorio",
                    SucursalId: "Id de la sucursal que realiza la compra. Obligatorio"
                }
            },
            {
                ruta: '/api/compras/eliminar',
                descripcion: 'Eliminar los datos de una compra',
                metodo: 'DELETE',
                parametros: {
                    id: "Se necesita el id de compras para poder eliminar una compra. Obligatorio"
                }
            }
        ]
    }
    res.json(moduloCompra);
}

exports.Listar = async (req, res) => {
    const listarCompras = await Compra.findAll({
        attributes: [
            ['id', 'Orden de Compra'],
            ['fecha', 'Fecha'],
            ['hora', 'Hora'],
            ['totalPagar', 'Total a Pagar'],
            ['imagen', 'Imagen Comprobante']
        ],
        include: [
            {
                model: Sucursal,
                attributes: [
                    ['nombre', 'Sucursal']
                ]
            },
        ]
    });
    res.json(listarCompras);
}

exports.buscarId = async (req, res) => {
    const { id } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        var buscarCompra = await Compra.findOne({ where: { id: id } });
        if (!buscarCompra) {
            res.send('El id de la compra no existe');
        } else {
        const { id } = req.query;
        const listarCompra = await Compra.findOne({
            attributes: [
                ['id', 'Orden de Compra'],
                ['fecha', 'Fecha'],
                ['hora', 'Hora'],
                ['totalPagar', 'Total a Pagar'],
                ['imagen', 'Imagen Comprobante']
            ],
            where: {
                id: id
            },
            include: [{
                model: Sucursal,
                attributes: [
                    ['nombre', 'Sucursal']
                ]
            }]
        });
        res.json(listarCompra);
    }
    }
}

exports.buscarFecha = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { fecha1, fecha2 } = req.query;
        const listarCompra = await Compra.findAll({
            attributes: [
                ['id', 'Orden de Compra'],
                ['fecha', 'Fecha'],
                ['hora', 'Hora'],
                ['totalPagar', 'Total a Pagar'],
                ['imagen', 'Imagen Comprobante']
            ],
            where: {
                [Op.and]: {
                    fecha: {
                        [Op.gte]: fecha1
                    },
                    fecha: {
                        [Op.lte]: fecha2
                    }
                }
            },
            include: [{
                model: Sucursal,
                attributes: [
                    ['nombre', 'Sucursal']
                ]
            }]
        });
        res.json(listarCompra);
    }
}

exports.BuscarPorSucursal = async (req, res) => {
    const { nombre } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        var buscarporSucursal = await Sucursal.findOne({ where: { nombre: nombre } });
        if (!buscarporSucursal) {
            res.send('El id de la compra no existe');
        } else {

        const listarCompra = await Compra.findAll({
            attributes: [
                ['id', 'Orden de Compra'],
                ['fecha', 'Fecha'],
                ['hora', 'Hora'],
                ['totalPagar', 'Pago Total'],
                ['imagen', 'Imagen Comprobante']
            ],
            include: [{
                model: Sucursal,
                attributes: [
                    ['nombre', 'Sucursal']
                ],
                where: {
                    nombre: {
                        [Op.like]: nombre
                    }
                }
            }]
        });
        res.json(listarCompra);
    }
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { SucursalId, hora } = req.body;
        if (!SucursalId) {
            res.json({ msj: 'Debe enviar los datos completos' })
        }
        else {
            var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
            if (!buscarSucursal) {
                res.send('El id de la sucursal no existe');
            } else {
                await Compra.create({
                    fecha: now(),
                    hora,
                    totalPagar: 0,
                    SucursalId
                }).then((data) => {
                    res.json({ msj: 'Registro guardado' })
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

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { SucursalId } = req.body;
    if ( !SucursalId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarCompra = await Compra.findOne({ where: { id: id } });
        if (!buscarCompra) {
            res.send('El id de la compra no existe');
        } else {
            var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
            if (!buscarSucursal) {
                res.send('El id de la sucursal no existe');
            } else {
                buscarCompra.SucursalId = SucursalId;
                await buscarCompra.save()
                    .then((data) => {
                        console.log(data);
                        res.send('Actualizado correctamente');
                    })
                    .catch((er) => {
                        var errores = '';
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

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Compra.destroy({ where: { id: id } })
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

exports.RecibirImagen = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.body;
    //console.log(req);
    console.log(filename);
    try {
        errores = [];
        data = [];
        var buscarCompra = await Compra.findOne({ where: { id } });
        if (!buscarCompra) {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/compras/' + filename));
            if (!buscarImagen)
                console.log('La imagen no existe');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/compras/' + filename));
                console.log('Imagen eliminada');
            }
            error.msg = 'El id de la compra no existe. Se elimino la imagen enviada';
            error.parametro = 'id';
            errores.push(error);
            MSJ("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/compras/' + buscarCompra.imagen));
            if (!buscarImagen)
                console.log('No encontro la imagen');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/compras/' + buscarCompra.imagen));
                console.log('Imagen eliminada');
            }
            buscarCompra.imagen = filename;
            await buscarCompra.save()
                .then((data) => {
                    MSJ('Peticion ejecutada correctamente', 200, data, errores, res);
                })
                .catch((error) => {
                    errores.push(error);
                    MSJ('Peticion ejecutada correctamente', 200, [], errores, res);
                });
        }
    } catch (error) {
        console.log(error);
        errores.push(error);
        MSJ('Error al ejecutar la peticion', 500, [], errores, res);
    }
}