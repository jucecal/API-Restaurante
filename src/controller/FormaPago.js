const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');
const FormaPago = require('../model/FormaPago');

exports.Inicio = (req, res) => {
    const moduloFormaPago = {
        modulo: 'FormaPago',
        descripcion: 'Gestiona las operaciones con el modelo de Formas de Pago',
        rutas: [
            {
                ruta: '/api/formaspago/listar',
                descripcion: 'Listar las formas de pago',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/formaspago/guardar',
                descripcion: 'Guardar los datos de una formas de pago',
                metodo: 'POST',
                parametros: {
                    formaPago: "nombre de forma de pago. Obligatorio"
                }
            },
            {
                ruta: '/api/formaspago/buscarId',
                descripcion: 'Muestra un cargo en específico según el id ingresado',
                metodo: 'GET',
                parametros: {
                    id: "Realizar una busqueda especifica de una forma de pago por su id"
                }
            },


            {
                ruta: '/api/formaspago/editar',
                descripcion: 'Modifica los datos de una formas de pago',
                metodo: 'PUT',
                parametros: {
                    id: "Identificar una forma de pago por su id",
                    formaPago: "nombre de forma de pago. Obligatorio"
                }
            },
            {
                ruta: '/api/formaspago/eliminar',
                descripcion: 'Elimina los datos de una formas de pago',
                metodo: 'DELETE',
                parametros: {
                    id: "Realizar una busqueda especifica de una forma de pago por su id"
                }
            }
        ]
    }
    res.json(moduloFormaPago);
}

exports.Listar = async (req, res) => {
    const listarFormaPago = await FormaPago.findAll({
        attributes: [
            ['id', 'Id'],
            ['formaPago', 'Forma de Pago']
        ],
    });
    res.json(listarFormaPago);
}

exports.BuscarId = async (req, res) => {
    const { id } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        var buscarFormaPago = await FormaPago.findOne({ where: { id: id } });
        if (!buscarFormaPago) {
            res.send('El id de la forma de pago no existe');
        } else {
            const listarFormaPago = await FormaPago.findOne({
                attributes: [
                    ['id', 'Id'],
                    ['formaPago', 'Forma de Pago']
                ],
                where: {
                    id: id
                }
            });
            res.json(listarFormaPago);
        }
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        console.log(req);
        const { formaPago } = req.body;
        if (!formaPago) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            await FormaPago.create({
                formaPago
            }).then(data => {
                res.json({ msj: 'Registro guardado' });
            })
                .catch((er) => {
                    var errores = '';
                    er.errors.forEach(element => {
                        console.log(element.message)
                        errores += element.message + '. ';
                    });
                    res.json({ errores });
                })
        }
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { formaPago } = req.body;
    if (!formaPago || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarFormaPago = await FormaPago.findOne({ where: { id: id } });
        if (!buscarFormaPago) {
            res.send('El id de la forma no existe');
        } else {
            buscarFormaPago.formaPago = formaPago;
            await buscarFormaPago.save()
                .then((data) => {
                    console.log(data);
                    res.send('Actualizado correctamente');
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

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await FormaPago.destroy({ where: { id: id } })
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