const Tipo = require('../model/Tipo');
const { validationResult } = require('express-validator');
const { request } = require('express');

exports.Inicio = (req, res) => {
    const moduloTipo = {
        modulo: 'tipos',
        descripcion: 'Gestiona las operaciones con el modelo de tipos',
        rutas: [
            {
                ruta: '/api/tipos/listar',
                descripcion: 'Listar los tipos',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/tipos/guardar',
                descripcion: 'Guardar los tipos',
                metodo: 'POST',
                parametros: {
                    tipo: "Nombre del Tipo de Producto. Obligatorio"
                }
            },
            {
                ruta: '/api/tipos/editar',
                descripcion: 'Modifica los tipos',
                metodo: 'PUT',
                parametros: {
                    tipo: "Nombre del Tipo de Producto. Obligatorio"
                }
            },
            {
                ruta: '/api/tipos/eliminar',
                descripcion: 'Elimina los tipos',
                metodo: 'DELETE',
                parametros: {
                    id: "Eliminar un tipo de producto por su id"
                }
            }
        ]
    }
    res.json(moduloTipos);
}

exports.Listar = async (req, res) => {
    const listarTipo = await Tipo.findAll({
        attributes: [
            ['id', 'Id'],
            ['tipo', 'Tipo de Producto']
        ]
    });
    res.json(listarTipo);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { tipo } = req.body;
        console.log(tipo);
        if (!tipo) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            await Tipo.create({
                tipo: tipo
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

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { tipo } = req.body;
    if (!tipo || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarTipo = await Tipo.findOne({ where: { id: id } });
        if (!buscarTipo) {
            res.send('El id del tipo no existe');
        } else {
            buscarTipo.tipo = tipo;
            await buscarTipo.save()
                .then((data) => {
                    console.log(data);
                    res.send('Actualizado correctamente');
                })
                .catch((er) => {
                    er.errors.forEach(element => {
                        console.log(element.message);
                        errores += element.message + '.';
                    })
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
        await Tipo.destroy({ where: { id: id } })
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