const Clientes = require('../model/Clientes');
const Usuario = require('../model/Usuario');
const { validationResult } = require('express-validator');
const { request } = require('express');
const MSJ = require('../components/mensaje');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
var errores = [];
var data = [];
var error = {
    msg: '',
    parametro: ''
};


exports.Inicio = (req, res) => {
    const moduloClientes = {
        modulo: 'clientes',
        descripcion: 'Gestiona las operaciones con el modelo de Clientes',
        rutas: [
            {
                ruta: '/api/clientes/listar',
                descripcion: 'Listar los Clientes',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/clientes/guardar',
                descripcion: 'Guardar los Clientes',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/clientes/editar',
                descripcion: 'Modifica los Clientes',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/clientes/eliminar',
                descripcion: 'Elimina los Clientes',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloClientes);
}
exports.Listar = async (req, res) => {
    const listarClientes = await Clientes.findAll({
        attributes: [
            ['id', 'ID Cliente'],
            ['nombre', 'Nombre'],
            ['apellido', 'Apellido'],
            ['telefono', 'Telefono'],
            ['fechaNacimiento', 'Fecha de Nacimiento'],
            ['direccion', 'Dirección'],
            'UsuarioId'
        ],
        include: [{
            model: Usuario,
            attributes: [
                ['nombre', 'Nombre de Usuario'],
                ['estado', 'Estado']
            ]
        }]
    });
    res.json(listarClientes);
}

exports.BuscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarClientes = await Clientes.findAll({
            attributes: [
                ['id', 'ID Cliente'],
                ['nombre', 'Nombre'],
                ['apellido', 'Apellido'],
                ['telefono', 'Telefono'],
                ['fechaNacimiento', 'Fecha de Nacimiento'],
                ['direccion', 'Dirección'],
                'UsuarioId'
            ],
            where: {
                id: id
            },
            include: [{
                model: Usuario,
                attributes: [
                    ['nombre', 'Nombre de Usuario'],
                    ['estado', 'Estado']
                ]
            }
            ]
        });
        res.json(listarClientes);
    }
}

exports.BuscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.query;
        const listarClientes = await Clientes.findAll({
            attributes: [
                ['id', 'ID Cliente'],
                ['nombre', 'Nombre'],
                ['apellido', 'Apellido'],
                ['telefono', 'Telefono'],
                ['fechaNacimiento', 'Fecha de Nacimiento'],
                ['direccion', 'Dirección'],
                'UsuarioId'
            ],
            where: {
                nombre: {
                    [Op.like]: nombre
                }
            },
            include: [{
                model: Usuario, 
                attributes: [
                    ['nombre', 'Nombre de Usuario'],
                    ['estado', 'Estado']
                ]
            }]
        });
        res.json(listarClientes);
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre, apellido, telefono, fechaNacimiento, direccion, UsuarioId } = req.body;
        if (!nombre || !apellido || !telefono || !fechaNacimiento || !direccion) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            var buscarUsuario = await Usuario.findOne({ where: { id: UsuarioId } });
            if (!buscarUsuario) {
                res.send('El id del usuario no existe');
            } else {
                await Clientes.create({
                    nombre,
                    apellido,
                    telefono,
                    fechaNacimiento,
                    direccion,
                    UsuarioId
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
    const { nombre, apellido, telefono, fechaNacimiento, direccion, UsuarioId } = req.body;
    if (!nombre || !apellido || !telefono || !fechaNacimiento || !direccion || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarCliente = await Clientes.findOne({ where: { id: id } });
        if (!buscarCliente) {
            res.send('El id del tipo no existe');
        } else {
            var buscarUsuario = await Usuario.findOne({ where: { id: UsuarioId } });
            if (!buscarUsuario) {
                res.send('El id del usuario no existe');
            } else {
                buscarCliente.nombre = nombre;
                buscarCliente.apellido = apellido;
                buscarCliente.telefono = telefono;
                buscarCliente.fechaNacimiento = fechaNacimiento;
                buscarCliente.direccion = direccion;
                buscarCliente.UsuarioId = UsuarioId;
                await buscarCliente.save()
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
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Clientes.destroy({ where: { id: id } })
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

exports.RecibirImagen = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.body;
    //console.log(req);
    console.log(filename);
    try {
        errores = [];
        data = [];
        var buscarCliente = await Clientes.findOne({ where: { id } });
        if (!buscarCliente) {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/clientes/' + filename));
            if (!buscarImagen)
                console.log('La imagen no existe');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/clientes/' + filename));
                console.log('Imagen eliminada');
            }
            error.msg = 'El id del producto no existe. Se elimino la imagen enviada';
            error.parametro = 'id';
            errores.push(error);
            MSJ("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/clientes/' + buscarCliente.imagen));
            if (!buscarImagen)
                console.log('No encontro la imagen');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/clientes/' + buscarCliente.imagen));
                console.log('Imagen eliminada');
            }
            buscarCliente.imagen = filename;
            await buscarCliente.save()
                .then((data) => {
                    MSJ('Peticion ejecutada correctamente', 200, data, errores, res);
                })
                .catch((error) => {
                    errores.push(error);
                    MSJ('Peticion ejecutada correctamente', 200, [], errores, res);
                });
        }
    } catch (error) {
        console.log(error);
        errores.push(error);
        MSJ('Error al ejecutar la peticion', 500, [], errores, res);
    }
}