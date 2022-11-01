const Clientes = require('../model/Clientes');
const { validationResult } = require('express-validator');
const {request} = require('express');

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
    const listarClientes = await Clientes.findAll();
    res.json(listarClientes);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombres, apellidos, telefono, fechaNacimiento, correo, direccion } = req.body;
        if (!nombres || !apellidos || !telefono || !fechaNacimiento || !correo || !direccion) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            await Clientes.create({
                nombres,
                apellidos,
                telefono,
                fechaNacimiento,
                correo,
                direccion
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
    const { nombres, apellidos, telefono, fechaNacimiento, correo, direccion } = req.body;
    if ( !nombres || !apellidos || !telefono || !fechaNacimiento || !correo || !direccion || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarCliente= await Clientes.findOne({ where: { id: id } });
        if (!buscarCliente) {
            res.send('El id del tipo no existe');
        } else {
            buscarCliente.nombres = nombres;
            buscarCliente.apellidos = apellidos;
            buscarCliente.telefono = telefono;
            buscarCliente.fechaNacimiento = fechaNacimiento;
            buscarCliente.correo = correo;
            buscarCliente.direccion = direccion;
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