const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');
const Proveedor = require('../model/Proveedor');

exports.Inicio = (req, res) => {
    const moduloProveedor = {
        modulo: 'Proveedor',
        descripcion: 'Gestiona las operaciones con el modelo de Proveedor',
        rutas: [
            {
                ruta: '/api/proveedor/listar',
                descripcion: 'Listar los proveedor',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/proveedor/guardar',
                descripcion: 'Guardar los datos de un proveedor',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/proveedor/editar',
                descripcion: 'Modifica los datos de un proveedor',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/proveedor/eliminar',
                descripcion: 'Elimina los datos de un proveedor',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloProveedor);
}

exports.Listar = async (req, res) => {
    const listarProveedor = await Proveedor.findAll();
    res.json(listarProveedor);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarProveedor = await Proveedor.findAll({
            where: {
                id
            }
        });
        res.json(listarProveedor);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { Proveedor } = req.body;
    if (!Proveedor) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Proveedor.create({
            proveedor
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
    const { proveedor} = req.body;
    if (!proveedor  || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarProveedor = await Proveedor.findOne({ where: { id: id } });
        if (!buscarProveedor) {
            res.send('El id del cliente no existe');
        } else {
            buscarProveedor.proveedor = proveedor;
            await buscarProveedor.save()
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
        await Proveedor.destroy({ where: { id: id } })
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