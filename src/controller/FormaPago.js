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
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/formaspago/editar',
                descripcion: 'Modifica los datos de una formas de pago',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/formaspago/eliminar',
                descripcion: 'Elimina los datos de una formas de pago',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloFormaPago);
}

exports.Listar = async (req, res) => {
    const listarFormaPago = await FormaPago.findAll({
        attributes: [

            ['id', 'ID Formas de Pago'], 
            ['formaPago', 'Forma de Pago']
        ]
    });
    res.json(listarFormaPago);
}

exports.BuscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { id } = req.query;
        const listarFormaPago = await FormaPago.findAll({
            attributes: [
                ['id', 'ID Forma de Forma'], 
                ['formaPago', 'Forma de Pago']
            ],
            where: {
                id: id
            }
        });
        res.json(listarFormaPago);
    }

}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if(!validationResult.isEmpty()){
        console.log(validacion.errors);
        res.json({msj: 'errores en los datos enviados'})
    }
    else{
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
                res.json({ msj: 'Error al guardar el registro' });
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