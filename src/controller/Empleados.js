const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');
const Empleado = require('../model/Empleados');
const Sucursal = require('../model/Sucursal');
const Cargo = require('../model/Cargo');
const Usuario = require('../model/Usuario');

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
        attributes: [['id', 'Código Empleado'], ['nombre', 'Nombre'], ['apellido', 'Apellido'], ['telefono', 'Telefono'], ['fechaNacimiento', 'Fecha de Nacimiento'], ['direccion', 'Dirección'], 'SucursalId', 'CargoId', 'UsuarioId'],
        include: [{ 
            model: Usuario, attributes: [['nombre', 'Nombre de Usuario']]
        }]
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
            where: {
                id
            }
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
                        correo,
                        direccion,
                        CargoId,
                        SucursalId,
                        UsuarioId
                    }).then(data => {
                        res.json({ msj: 'Registro guardado' });
                    })
                        .catch((er) => {
                            res.json({ msj: 'Error al guardar el registro' });
                        })
                }
            }
        }
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { nombre, apellido, telefono, fechaNacimiento, direccion } = req.body;
    if (!nombre || !apellido || !telefono || !fechaNacimiento || !direccion || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarEmpleado = await Empleado.findOne({ where: { id: id } });
        if (!buscarEmpleado) {
            res.send('El id del cliente no existe');
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
                        buscarEmpleado.correo = correo;
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