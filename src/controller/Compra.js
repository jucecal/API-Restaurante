const Compra = require('../model/Compra');
const Sucursal = require('../model/Sucursal');
const { validationResult } = require('express-validator');
const { request } = require('express');
const MSJ = require('../components/mensaje');
const { Op } = require('sequelize');

const fs = require('fs');
const path = require('path');
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
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/buscarFecha',
                descripcion: 'Lista las compras realizadas en un periodo de tiempo entre una fecha y otra',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/buscarporSucursal',
                descripcion: 'Lista las compras realizadas en una sucursal en específico',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/guardar',
                descripcion: 'Guardar los datos de una compra',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/editar',
                descripcion: 'Modificar los datos de una compra',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/eliminar',
                descripcion: 'Eliminar los datos de una compra',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloCompra);
}

exports.Listar = async (req, res) => {
    const listarCompras = await Compra.findAll({
        attributes: [['id', 'Código Compra'], ['fecha', 'Fecha'], ['totalPagar', 'Pago Total'], ['imagen', 'Imagen Comprobante'], ['SucursalId', 'Código Sucursal']],
        include: [
            { model: Sucursal, attributes: [['nombre', 'Nombre Sucursal']] }
        ]
    });
    res.json(listarCompras);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarCompra = await Compra.findAll({
            attributes: [['id', 'Código Compra'], ['fecha', 'Fecha'], ['totalPagar', 'Pago Total'], ['imagen', 'Imagen Comprobante'], ['SucursalId', 'Código Sucursal']],
            where: {
                id: id
            },
            include: [
                { model: Sucursal, attributes: [['nombre', 'Nombre Sucursal']] }
            ]
        });
        res.json(listarCompra);
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
            attributes: [['id', 'Código Compra'], ['fecha', 'Fecha'], ['totalPagar', 'Pago Total'], ['imagen', 'Imagen Comprobante'], ['SucursalId', 'Código Sucursal']],
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
            include: [
                { model: Sucursal, attributes: [['nombre', 'Nombre Sucursal']] }
            ]
        });
        res.json(listarCompra);
    }
}

exports.BuscarPorSucursal = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { nombre } = req.query;
        const listarCompra = await Compra.findAll({
            attributes: [['id', 'Código Compra'], ['fecha', 'Fecha'], ['totalPagar', 'Pago Total'], ['imagen', 'Imagen Comprobante'], ['SucursalId', 'Código Sucursal']],
            include: [
                { model: Sucursal, attributes: [['nombre', 'Nombre Sucursal']], where: { nombre: { [Op.like]: nombre } } }
            ]

        });
        res.json(listarCompra);
    }

}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { fecha, totalPagar, SucursalId } = req.body;
        if (!fecha || !totalPagar || !SucursalId) {
            res.json({ msj: 'Debe enviar los datos completos' })
        }
        else {
            var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
            if (!buscarSucursal) {
                res.send('El id de la sucursal no existe');
            } else {
                await Compra.create({
                    fecha,
                    totalPagar,
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
    const { fecha, totalPagar, SucursalId } = req.body;
    if (!fecha || !totalPagar || !SucursalId || !id) {
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
                buscarCompra.fecha = fecha;
                buscarCompra.totalPagar = totalPagar;
                buscarCompra.SucursalId = SucursalId;
                await buscarCompra.save()
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