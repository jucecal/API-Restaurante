const Mesas = require('../model/Mesas');
const Sucursal = require('../model/Sucursal');
const { validationResult } = require('express-validator');
const { request } = require('express');

exports.Inicio = (req, res) => {
    const moduloMesas = {
        modulo: 'mesas',
        descripcion: 'Gestiona las operaciones con el modelo de <esas>',
        rutas: [
            {
                ruta: '/api/mesas/listar',
                descripcion: 'Listar las Mesas',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/mesas/guardar',
                descripcion: 'Guardar las Mesas',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/mesas/editar',
                descripcion: 'Modifica las Mesas',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/cargos/buscarId',
                descripcion: 'Muestra una mesa en específico según el id ingresado',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/mesas/eliminar',
                descripcion: 'Elimina las Mesas',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloMesas);
}

exports.Listar = async (req, res) => {
    const listarMesas = await Mesas.findAll({
        attributes: [
            ['id', 'Mesa'],
            ['capacidad', 'Capacidad'],
        ],
        include: [{
            model: Sucursal,
            attributes: [
                ['nombre', 'Sucursal']
            ]
        }]
    });
    res.json(listarMesas);
}

exports.BuscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarMesas = await Mesas.findAll({
            attributes: [
                ['id', 'Mesa'],
                ['capacidad', 'Capacidad'],
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
        res.json(listarMesas);
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { capacidad, SucursalId } = req.body;
        if (!capacidad, !SucursalId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
            if (!buscarSucursal) {
                res.send('El id de la sucursal no existe');
            } else {
                await Mesas.create({
                    capacidad,
                    SucursalId
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

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { capacidad } = req.body;
    if (!capacidad || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarMesa = await Mesas.findOne({ where: { id: id } });
        if (!buscarMesa) {
            res.send('El id de la mesa no existe');
        } else {
            buscarMesa.capacidad = capacidad;
            await buscarMesa.save()
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
        await Mesas.destroy({ where: { id: id } })
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