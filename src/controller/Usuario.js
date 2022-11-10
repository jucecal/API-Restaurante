const Usuario = require('../model/Usuario');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { request } = require('express');

exports.Inicio = (req, res) => {
    const moduloUsuario = {
        modulo: 'usuarios',
        descripcion: 'Gestiona las operaciones con el modelo de usuarios',
        rutas: [
            {
                ruta: '/api/usuarios/listar',
                descripcion: 'Listar los usuarios',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/usuarios/guardar',
                descripcion: 'Guardar los usuarios',
                metodo: 'POST',
                parametros: {
                    nombre: "Nombre de usuario para poder logearse al sistema. Obligatorio",
                    correo: "Correo electrónico para crear cuenta en el sistema. obligatorio",
                    password: "Contraseña para poder logearse en el sistema. Obligatorio",
                    tipo: "Tipo de rol que tendrá la persona en el sistema. Obligatorio "
                }
            },
            {
                ruta: '/api/usuarios/editar',
                descripcion: 'Modifica los usuarios',
                metodo: 'PUT',
                parametros: {
                    nombre: "Nombre de usuario para poder logearse al sistema. Obligatorio",
                    correo: "Correo electrónico para crear cuenta en el sistema. obligatorio",
                    password: "Contraseña para poder logearse en el sistema. Obligatorio",
                    tipo: "Tipo de rol que tendrá la persona en el sistema. Obligatorio "
                }
            },
            {
                ruta: '/api/usuarios/buscarId',
                descripcion: 'Muestra un cargo en específico según el id ingresado',
                metodo: 'GET',
                parametros: {
                    id: "Realizar una busqueda por id de usuarios"
                }
            },

            {
                ruta: '/api/usuarios/buscarNombre',
                descripcion: 'Muestra el o los cargos que coincidan con el nombre ingresado',
                metodo: 'GET',
                parametros: {
                    nombre: "Realizar una busqueda por nombre de usuario"
                }
            },
            {
                ruta: '/api/usuarios/eliminar',
                descripcion: 'Elimina los usuarios',
                metodo: 'DELETE',
                parametros: {
                    id: "Eliminar un usuario por id de usuario"
                }
            }
        ]
    }
    res.json(moduloUsuario);
}

exports.Listar = async (req, res) => {
    const listarUsuario = await Usuario.findAll({
        attributes: [
            ['id', 'Id'],
            ['nombre', 'Nombre'],
            ['correo', 'Correo'],
            ['password', 'Contraseña'],
            ['tipo', 'Tipo'],
            ['estado', 'Estado'],
            ['codigo', 'Codigo'],
            ['fallido', 'Fallido']
        ],
    });
    res.json(listarUsuario);
}

exports.BuscarId = async (req, res) => {
    const { id } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        var buscarUsuario = await Usuario.findOne({ where: { id: id } });
        if (!buscarUsuario) {
            res.send('El id del usuario no existe');
        } else {
            const listarUsuario = await Usuario.findOne({
                attributes: [
                    ['id', 'Id'],
                    ['nombre', 'Nombre'],
                    ['correo', 'Correo'],
                    ['password', 'Contraseña'],
                    ['tipo', 'Tipo'],
                    ['estado', 'Estado'],
                    ['codigo', 'Codigo'],
                    ['fallido', 'Fallido']
                ],
                where: {
                    id: id
                },
            });
            res.json(listarUsuario);
        }
    }
}

exports.BuscarNombre = async (req, res) => {
    const { nombre } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        var buscarUsuario = await Usuario.findOne({ where: { nombre: nombre } });
        if (!buscarUsuario) {
            res.send('El usuario no existe');
        } else {
            const listarUsuario = await Usuario.findOne({
                attributes: [
                    ['id', 'Id'],
                    ['nombre', 'Nombre'],
                    ['correo', 'Correo'],
                    ['password', 'Contraseña'],
                    ['tipo', 'Tipo'],
                    ['estado', 'Estado'],
                    ['codigo', 'Codigo'],
                    ['fallido', 'Fallido']
                ],
                where: {
                    nombre: {
                        [Op.like]: nombre
                    }
                },
            });
            res.json(listarUsuario);
        }
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre, correo, password, tipo, estado } = req.body;
        if (!nombre || !correo || !password) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            await Usuario.create({
                nombre,
                correo,
                password,
                tipo,
                estado
            }).then(data => {
                res.json({ msj: 'Registro guardado' });
            })
                .catch((er) => {
                    var errores = '';
                    er.errors.forEach(element => {
                        console.log(element.message);
                        errores += element.message + '.';
                    })
                    res.json({ errores });
                })
        }
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { nombre, correo, password, tipo, estado } = req.body;
    if (!nombre || !correo || !password || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarUsuario = await Usuario.findOne({ where: { id: id } });
        if (!buscarUsuario) {
            res.send('El id del usuario no existe');
        } else {
            buscarUsuario.nombre = nombre;
            buscarUsuario.correo = correo;
            buscarUsuario.password = password;
            buscarUsuario.tipo = tipo;
            buscarUsuario.estado = estado;
            await buscarUsuario.save()
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
        await Usuario.destroy({ where: { id: id } })
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