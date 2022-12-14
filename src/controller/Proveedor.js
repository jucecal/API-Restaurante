const { validationResult, body } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');
const Proveedor = require('../model/Proveedor');

exports.Inicio = (req, res) => {
    const moduloProveedor = {
        modulo: 'Proveedor',
        descripcion: 'Gestiona las operaciones con el modelo de Proveedor',
        rutas: [
            {
                ruta: '/api/proveedor/listar',
                descripcion: 'Listar los proveedor',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/proveedor/guardar',
                descripcion: 'Guardar los datos de un proveedor',
                metodo: 'POST',
                parametros: {
                    proveedor: "Proveedor. Obligatorio",
                    nombreContacto: "Nombre de Contacto del Proveedor. Obligatorio",
                    telefono: "Telefono del Proveedor. Obligatorio"
                }
            },
            {
                ruta: '/api/proveedor/buscarId',
                descripcion: 'Muestra un proveedor en específico según el id ingresado',
                metodo: 'GET',
                parametros: {
                    id: "Buscar un proveedor por su id"
                }
            },
            {
                ruta: '/api/proveedor/editar',
                descripcion: 'Modifica los datos de un proveedor',
                metodo: 'PUT',
                parametros: {
                    proveedor: "Proveedor. Obligatorio",
                    nombreContacto: "Nombre de Contacto del Proveedor. Obligatorio",
                    telefono: "Telefono del Proveedor. Obligatorio"
                }
            },
            {
                ruta: '/api/proveedor/eliminar',
                descripcion: 'Elimina los datos de un proveedor',
                metodo: 'DELETE',
                parametros: {
                    id: "Eliminar un proveedor por su id"
                }
            }
        ]
    }
    res.json(moduloProveedor);
}

exports.Listar = async (req, res) => {
    const listarProveedor = await Proveedor.findAll({
        attributes: [
            ['id', 'Id'],
            ['proveedor', 'Proveedor'],
            ['nombreContacto', 'Contacto'],
            ['telefono', 'Telefono']
        ]
    });
    res.json(listarProveedor);
}

exports.buscarId = async (req, res) => {
    const { id } = req.query;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        var buscarProveedor = await Proveedor.findOne({ where: { id: id } });
        if (!buscarProveedor) {
            res.send('El id del proveedor no existe');
        } else {
            const listarProveedor = await Proveedor.findOne({
                attributes: [
                    ['id', 'Id'],
                    ['proveedor', 'Proveedor'],
                    ['nombreContacto', 'Contacto'],
                    ['telefono', 'Telefono']
                ],
                where: {
                    id
                }
            });
            res.json(listarProveedor);
        }
    }
}

exports.BuscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { proveedor } = req.query;
        const listarProveedor = await Proveedor.findAll({
            attributes: [
                ['id', 'Id'],
                ['proveedor', 'Proveedor'],
                ['nombreContacto', 'Contacto'],
                ['telefono', 'Telefono']
            ],
            where: {

                proveedor: { [Op.like]: proveedor},

            }

        });
        res.json(listarProveedor);
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        console.log(req);
        const { proveedor, nombreContacto, telefono } = req.body;
        if (!proveedor || !nombreContacto || !telefono) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            await Proveedor.create({
                proveedor,
                nombreContacto,
                telefono
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
    const { proveedor, nombreContacto, telefono } = req.body;
    if (!proveedor || !nombreContacto || !telefono || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarProveedor = await Proveedor.findOne({ where: { id: id } });
        if (!buscarProveedor) {
            res.send('El id del cliente no existe');
        } else {
            buscarProveedor.proveedor = proveedor;
            buscarProveedor.nombreContacto = nombreContacto;
            buscarProveedor.telefono = telefono;
            await buscarProveedor.save()
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
        await Proveedor.destroy({ where: { id: id } })
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