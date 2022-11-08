const { validationResult } = require('express-validator');
const { request } = require('express');
const Empleado = require('../model/Empleados');
const Sucursal = require('../model/Sucursal');
const Cargo = require('../model/Cargo');
const Usuario = require('../model/Usuario');
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
    const moduloEmpleado = {
        modulo: 'Empleados',
        descripcion: 'Gestiona las operaciones con el modelo de Empleados',
        rutas: [
            {
                ruta: '/api/empleados/listar',
                descripcion: 'Listar los empleados',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/empleados/guardar',
                descripcion: 'Guardar los datos de un empleado',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/empleados/editar',
                descripcion: 'Modifica los datos de un empleado',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/empleados/eliminar',
                descripcion: 'Elimina los datos de un empleado',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloEmpleado);
}

exports.Listar = async (req, res) => {
    const listarEmpleado = await Empleado.findAll({
        attributes: [
            ['id', 'Código Empleado'],
            ['nombre', 'Nombre'],
            ['apellido', 'Apellido'],
            ['telefono', 'Telefono'],
            ['fechaNacimiento', 'Fecha de Nacimiento'],
            ['direccion', 'Dirección'],
            'SucursalId',
            'CargoId',
            'UsuarioId'
        ],
        include: [
            {
                model: Usuario,
                attributes: [
                    ['nombre', 'Nombre de Usuario']
                ]
            },
            {
                model: Sucursal,
                attributes: [
                    ['nombre', 'Sucursal']
                ]
            },
            {
                model: Cargo,
                attributes: [
                    ['nombre', 'Cargo']
                ]
            }
        ]
    });
    res.json(listarEmpleado);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarEmpleado = await Empleado.findAll({

            attributes: [
                ['id', 'ID Empleado'],
                ['nombre', 'Nombre'],
                ['apellido', 'Apellido'],
                ['telefono', 'Telefono'],
                ['fechaNacimiento', 'Fecha de Nacimiento'],
                ['direccion', 'Dirección'],
                ['SucursalId', 'ID Sucursal'],
                ['CargoId', 'ID Cargo'],
                ['UsuarioId', 'ID Usuario']
            ],
            where: {
                id
            },
            include: [
                {
                    model: Usuario,
                    attributes: [
                        ['nombre', 'Nombre de Usuario']
                    ]
                },
                {
                    model: Sucursal,
                    attributes: [
                        ['nombre', 'Sucursal']
                    ]
                },
                {
                    model: Cargo,
                    attributes: [
                        ['nombre', 'Cargo']
                    ]
                }
            ]
        });
        res.json(listarEmpleado);
    }
}

exports.BuscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { nombre } = req.query;
        const listarEmpleado = await Empleado.findAll({
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
            include: [
                {
                    model: Usuario,
                    attributes: [
                        ['nombre', 'Nombre de Usuario']
                    ]
                },
                {
                    model: Sucursal,
                    attributes: [
                        ['nombre', 'Sucursal']
                    ]
                },
                {
                    model: Cargo,
                    attributes: [
                        ['nombre', 'Cargo']
                    ]
                }
            ]
        });
        res.json(listarEmpleado);
    }
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { nombre, apellido, telefono, fechaNacimiento, direccion, SucursalId, CargoId, UsuarioId } = req.body;
    if (!nombre || !apellido || !telefono || !fechaNacimiento || !direccion || !SucursalId || !CargoId || !UsuarioId) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarCargo = await Cargo.findOne({ where: { id: CargoId } });
        if (!buscarCargo) {
            res.send('El id del cargo no existe');
        } else {
            var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
            if (!buscarSucursal) {
                res.send('El id de la sucursal no existe');
            } else {
                var buscarUsuario = await Usuario.findOne({ where: { id: UsuarioId } });
                if (!buscarUsuario) {
                    res.send('El id del usuario no existe');
                } else {
                    await Empleado.create({
                        nombre,
                        apellido,
                        telefono,
                        fechaNacimiento,
                        direccion,
                        CargoId,
                        SucursalId,
                        UsuarioId
                    }).then(data => {
                        res.json({ msj: 'Registro guardado' });
                    })
                        .catch((er) => {
                            res.json({ msj: 'Error al guardar el registro' });
                            console.log(er);
                        })
                }
            }
        }
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { nombre, apellido, telefono, fechaNacimiento, direccion, SucursalId, CargoId, UsuarioId } = req.body;
    if (!nombre || !apellido || !telefono || !fechaNacimiento || !direccion || !SucursalId || !CargoId || !UsuarioId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarEmpleado = await Empleado.findOne({ where: { id: id } });
        if (!buscarEmpleado) {
            res.send('El id del empleado no existe');
        } else {
            var buscarCargo = await Cargo.findOne({ where: { id: CargoId } });
            if (!buscarCargo) {
                res.send('El id de la categoría no existe');
            } else {
                var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
                if (!buscarSucursal) {
                    res.send('El id de la categoría no existe');
                } else {
                    var buscarUsuario = await Sucursal.findOne({ where: { id: UsuarioId } });
                    if (!buscarUsuario) {
                        res.send('El id de la categoría no existe');
                    } else {
                        buscarEmpleado.nombre = nombre;
                        buscarEmpleado.apellido = apellido;
                        buscarEmpleado.telefono = telefono;
                        buscarEmpleado.fechaNacimiento = fechaNacimiento;
                        buscarEmpleado.direccion = direccion;
                        buscarEmpleado.SucursalId = SucursalId;
                        buscarEmpleado.CargoId = CargoId;
                        buscarEmpleado.UsuarioId = UsuarioId;
                        await buscarEmpleado.save()
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
    }
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Empleado.destroy({ where: { id: id } })
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
        var buscarEmpleado = await Empleado.findOne({ where: { id } });
        if (!buscarEmpleado) {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + filename));
            if (!buscarImagen)
                console.log('La imagen no existe');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + filename));
                console.log('Imagen eliminada');
            }
            error.msg = 'El id del producto no existe. Se elimino la imagen enviada';
            error.parametro = 'id';
            errores.push(error);
            MSJ("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + buscarEmpleado.imagen));
            if (!buscarImagen)
                console.log('No encontro la imagen');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + buscarEmpleado.imagen));
                console.log('Imagen eliminada');
            }
            buscarEmpleado.imagen = filename;
            await buscarEmpleado.save()
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