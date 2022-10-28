const Usuario = require('../model/Usuario');
const { validationResult } = require('express-validator');
const {request} = require('express');

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
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/usuarios/editar',
                descripcion: 'Modifica los usuarios',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/usuarios/eliminar',
                descripcion: 'Elimina los usuarios',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloUsuario);
}

exports.Listar = async (req, res) => {
    const listarUsuario = await Usuario.findAll();
    res.json(listarUsuario);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });

    } else {
        const { nombre, correo, password, tipo } = req.body;
        console.log(nombre, correo, password, tipo);
        if (!nombre || !correo || !password || !tipo) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            await Usuario.create({
                nombre: nombre,
                correo: correo,
                password: password,
                tipo:tipo

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
    const { nombre, correo, password, tipo } = req.body;
    if (!nombre || !correo || !password || !tipo || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarUsuario= await Tipo.findOne({ where: { id: id } });
        if (!buscarUsuario) {
            res.send('El id del tipo no existe');
        } else {
            buscarUsuario.nombre= nombre;
            await buscarUsuario.save()
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