const IxCompra = require('../model/IxCompra');
const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');

exports.Inicio = (req, res) => {
    const moduloIxCompra = {
        modulo: 'ixcompras',
        descripcion: 'Gestiona las operaciones con el modelo de compras',
        rutas: [
            {
                ruta: '/api/ixcompras/listar',
                descripcion: 'Listar las compras',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/ixcompras/guardar',
                descripcion: 'Guardar los datos de una compra',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/ixcompras/editar',
                descripcion: 'Modifica los datos de una compra',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/ixcompras/eliminar',
                descripcion: 'Elimina los datos de una compra',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloIxCompra);
}

exports.Listar = async (req, res) => {
    const listarIxCompra = await IxCompra.findAll();
    res.json(listarIxCompra);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarIxCompra = await IxCompra.findAll({
            where: {
                id
            }
        });
        res.json(listarIxCompra);
    }
}

exports.buscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.query;
        const listarIxCompra = await IxCompra.findAll({
            attributes:['nombre', 'marca', 'vencimiento','preciounitario'],
            where: {
                [Op.and]: {
                    nombre: {
                        [Op.like]: nombre
                    },
                    activo: true
                }
            }
        });
        res.json(listarIxCompra);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { nombre, marca, vencimiento, preciounitario } = req.body;
    if (!nombre || !marca || !vencimiento || !preciounitario) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await IxCompra.create({
            nombre,
            marca,
            vencimiento,
            preciounitario
        }).then(data => {
            res.json({ msj: 'Registro guardado' });
        })
            .catch((er) => {
                res.json({ msj: 'Error al guardar el registro' });
            })
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { nombre, marca, vencimiento, preciounitario} = req.body;
    if (!nombre || !marca || !vencimiento || !preciounitario) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarIxCompra = await IxCompra.findOne({ where: { id: id } });
        if (!buscarIxCompra) {
            res.send('El id del cliente no existe');
        } else {
            buscarIxCompra = nombre;
            buscarIxCompra = marca;
            buscarIxCompra = vencimiento;
            buscarIxCompra = preciounitario;
            await buscarSucursal.save()
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

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await IxCompra.destroy({ where: { id: id } })
            .then((data) => {
                if(data==0){
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