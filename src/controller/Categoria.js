const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');
const Categoria = require('../model/Categoria');

exports.Inicio = (req, res) => {
    const moduloCategoria = {
        modulo: 'categorias',
        descripcion: 'Gestiona las operaciones con el modelo de categorias',
        rutas: [
            {
                ruta: '/api/categorias/listar',
                descripcion: 'Listar las categorias',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/categorias/guardar',
                descripcion: 'Guardar los datos de una categoria',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/categorias/editar',
                descripcion: 'Modifica los datos de una categoria',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/categorias/eliminar',
                descripcion: 'Elimina los datos de una categoria',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloCategoria);
}


exports.Listar = async (req, res) => {
    const listarCategoria = await Categoria.findAll({

        attributes: [['id', 'Código Categoria'],
                    ['categoria', 'Nombre Categoria']
                ]

    });
    res.json(listarCategoria);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarCategoria = await Categoria.findAll({
            attributes: [
                ['id', 'Código Categoria'], 
                ['categoria', 'Nombre Categoria']
            ],
            where: {
                id: id
            }
        });
        res.json(listarCategoria);
    }
}

exports.BuscarCategoria = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { categoria } = req.query;
        const listarCategoria = await Categoria.findAll({
            attributes: [
                ['id', 'Código Categoria'], 
                ['categoria', 'Nombre Categoria']
            ],
            where: {
                categoria: { [Op.like]: categoria }
            },
        });
        res.json(listarCategoria);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { categoria } = req.body;
    if (!categoria) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Categoria.create({
            categoria
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
    const { categoria } = req.body;
    if (!categoria || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarCategoria = await Categoria.findOne({ where: { id: id } });
        if (!buscarCategoria) {
            res.send('El id del cliente no existe');
        } else {
            buscarCategoria.categoria = categoria;
            await buscarCategoria.save()
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
        await Categoria.destroy({ where: { id: id } })
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