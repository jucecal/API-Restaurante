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
                parametros: {
                    nombre: "Nombre del empleado. Obligatorio",
                    apellido: "Apellido del empleado. Obligatorio",
                    telefono: "Telefono del empleado. Obligatorio",
                    fechaNacimiento: "Fecha de nacimiento del empleado. Obligatorio",
                    direccion: "Direccion del empleado",
                    SucursalId: "Id de la sucursal donde pertenece. Obligatorio",
                    CargoId: "Id del cargo del empleado",
                    UsuarioId: "Id del usuario del empleado"
                }
            },
            {
                ruta: '/api/empleados/buscarId',
                descripcion: 'Muestra un cargo en específico según el id ingresado',
                metodo: 'GET',
                parametros: {
                    id: "Dato que se manda para poder listar el cargo por Id."
                }
            },
            {
                ruta: '/api/empleado/buscarNombre',
                descripcion: 'Muestra el o los cargos que coincidan con el nombre ingresado',
                metodo: 'GET',
                parametros: {
                    nombre: "Dato que se manda para poder listar el cargo por nombre."
                }
            },
            {
                ruta: '/api/empleado/recibirImagen',
                descripcion: 'almacena la imagen ingresada por el usuario',
                metodo: 'GET',
                parametros: {
                    img: "Fotografia del empleado"
                }
            },
            {
                ruta: '/api/empleados/editar',
                descripcion: 'Modifica los datos de un empleado',
                metodo: 'PUT',
                parametros: {
                    id: "Dato que se manda para poder identificar al empleado.",
                    nombre: "Nombre del empleado. Obligatorio",
                    apellido: "Apellido del empleado. Obligatorio",
                    telefono: "Telefono del empleado. Obligatorio",
                    fechaNacimiento: "Fecha de nacimiento del empleado. Obligatorio",
                    direccion: "Direccion del empleado",
                    SucursalId: "Id de la sucursal donde pertenece. Obligatorio",
                    CargoId: "Id del cargo del empleado",
                    UsuarioId: "Id del usuario del empleado"
                }
            },
            {
                ruta: '/api/empleados/eliminar',
                descripcion: 'Elimina los datos de un empleado',
                metodo: 'DELETE',
                parametros: {
                    id: "ID para eliminar un empleado."
                }
            }
        ]
    }
    res.json(moduloEmpleado);
}

exports.Listar = async (req, res) => {
    const listarEmpleado = await Empleado.findAll({
        attributes: [
            ['id', 'Id'],
            ['nombre', 'Nombre'],
            ['apellido', 'Apellido'],
            ['telefono', 'Telefono'],
            ['imagen', 'Foto'],
            ['fechaNacimiento', 'Fecha de Nacimiento'],
            ['direccion', 'Direccion']
        ],
        include: [
            {
                model: Usuario,
                attributes: [
                    ['nombre', 'Nombre'],
                    ['estado', 'Estado']
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
    const { id } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        var buscarEmpleado = await Empleado.findOne({ where: { id: id } });
        if (!buscarEmpleado) {
            res.send('El id del empleado no existe');
        } else {
            const listarEmpleado = await Empleado.findAll({
                attributes: [
                    ['id', 'Id'],
                    ['nombre', 'Nombre'],
                    ['apellido', 'Apellido'],
                    ['telefono', 'Telefono'],
                    ['fechaNacimiento', 'Fecha de Nacimiento'],
                    ['direccion', 'Dirección']
                ],
                where: {
                    id
                },
                include: [
                    {
                        model: Usuario,
                        attributes: [
                            ['nombre', 'Nombre de Usuario'],
                            ['estado', 'Estado']
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
}

exports.BuscarNombre = async (req, res) => {
    const { nombre } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' });
    } else {
        var buscarEmpleado = await Empleado.findOne({ where: { nombre: nombre } });
        if (!buscarEmpleado) {
            res.send('El empleado no existe');
        } else {
            const listarEmpleado = await Empleado.findAll({
                attributes: [
                    ['id', 'Id'],
                    ['nombre', 'Nombre'],
                    ['apellido', 'Apellido'],
                    ['telefono', 'Telefono'],
                    ['fechaNacimiento', 'Fecha de Nacimiento'],
                    ['direccion', 'Dirección']
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
                            ['nombre', 'Nombre de Usuario'],
                            ['estado', 'Estado']
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
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
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