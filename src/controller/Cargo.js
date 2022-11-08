const Cargo = require('../model/Cargo');
const { validationResult, body } = require('express-validator');
const { Op } = require('sequelize');
exports.Inicio = (req, res) => {
    const moduloCargo = {
        modulo: 'cargos',
        descripcion: 'Gestiona las operaciones con el modelo de cargo',
        rutas: [
            {
                ruta: '/api/cargos/listar',
                descripcion: 'Lista los cargos en el negocio',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/cargos/buscarId',
                descripcion: 'Muestra un cargo en específico según el id ingresado',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/cargos/buscarNombre',
                descripcion: 'Muestra el o los cargos que coincidan con el nombre ingresado',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/cargos/guardar',
                descripcion: 'Guarda los datos de un cargo',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/cargos/editar',
                descripcion: 'Modifica los datos de un cargo',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/cargos/eliminar',
                descripcion: 'Elimina los datos de un cargo',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloCargo);
}

exports.Listar = async (req, res) => {
    const listarCargo = await Cargo.findAll({
        attributes: [
            ['id', 'Código Cargo'],
            ['nombre', 'Nombre Cargo']
        ]
    });
    res.json(listarCargo);
}

exports.BuscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarCargos = await Cargo.findAll({
            attributes: [
                ['id', 'Código Cargo'],
                ['nombre', 'Nombre Cargo']
            ],
            where: {
                id: id
            }
        });
        res.json(listarCargos);
    }
}

exports.BuscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.query;
        const listarCargos = await Cargo.findAll({
            attributes: [
                ['id', 'Código Cargo'],
                ['nombre', 'Nombre Cargo']
            ],
            where: {
                nombre: {
                    [Op.like]: nombre
                }
            }
        });
        res.json(listarCargos);
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.body;

        if (!nombre) {
            res.json({ msj: 'Debe enviar el nombre del cargo' })
        }
        else {
            await Cargo.create({
                nombre: nombre
            }).then((data) => {
                res.json({ msj: 'Registro guardado' })
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

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { nombre } = req.body;
    if (!nombre || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    }
    else {
        var buscarCargo = await Cargo.findOne({ where: { id: id } });
        if (!buscarCargo) {
            res.send('El id del cargo no existe');
        }
        else {
            buscarCargo.nombre = nombre;
            await buscarCargo.save()
                .then((data) => {
                    console.log(data);
                    res.send('Se modificó correctamente')
                })
                .catch((er) => {
                    console.log(er);
                    res.send('Error al guardar los cambios');
                });
        }

    }
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    }
    else {
        await Cargo.destroy({ where: { id: id } })
            .then((data) => {
                if (data == 0) {
                    res.send('El id no existe')
                }
                else {
                    res.send('Registros eliminados ' + data)
                }

            })
            .catch((er) => {
                res.send('Error al eliminar el registro');
            })
    }

}