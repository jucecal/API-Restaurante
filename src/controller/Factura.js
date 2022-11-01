const Factura = require('../model/Factura');
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
    const listarFactura = await Factura.findAll();
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
            where: {
                id
            }
        });
        res.json(listarFactura);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { fecha, ISV, totalPagar, efectivo, cambio } = req.body;
    if (!fecha || !ISV || !totalPagar || !efectivo) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Factura.create({
            fecha: now(),
            ISV,
            totalPagar,
            efectivo,
            cambio
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
    const { ISV, totalPagar, efectivo, cambio} = req.body;
    if (!fecha || !ISV || !totalPagar || !efectivo || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarFactura = await Factura.findOne({ where: { id: id } });
        if (!buscarFactura) {
            res.send('El id de la factura no existe');
        } else {
            buscarFactura.ISV = ISV;
            buscarFactura.totalPagar = totalPagar;
            buscarFactura.efectivo = efectivo;
            buscarFactura.cambio = cambio;
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

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Factura.destroy({ where: { id: id } })
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