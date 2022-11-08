const Reservaciones = require('../model/Reservaciones');
const Clientes = require('../model/Clientes');
const Mesas = require('../model/Mesas');
const { validationResult } = require('express-validator');
const { request } = require('express');

exports.Inicio = (req, res) => {
    const moduloReservaciones = {
        modulo: 'reservaciones',
        descripcion: 'Gestiona las operaciones con el modelo de Reservaciones',
        rutas: [
            {
                ruta: '/api/reservaciones/listar',
                descripcion: 'Listar las Reservaciones',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/reservaciones/guardar',
                descripcion: 'Guardar las Reservaciones',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/reservaciones/editar',
                descripcion: 'Modifica las Reservaciones',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/reservaciones/eliminar',
                descripcion: 'Elimina las Reservaciones',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloReservaciones);
}

exports.Listar = async (req, res) => {
    const listarReservaciones = await Reservaciones.findAll({
        attributes: [
            ['id', 'ID Sucursal'], 
            ['fechaHora', 'Fecha y Hora'], 
            ['ClienteId', 'ID Cliente'], 
            ['MesaId', 'ID Mesa']
        ],
        include: [{
            model: Sucursal,
            attributes: [
                ['nombre', 'Sucursal']
            ]
        }]
    });
    res.json(listarReservaciones);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { fechaHora, ClienteId, MesaId } = req.body;
        if (!fechaHora || !ClienteId || !MesaId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            var buscarCliente = await Clientes.findOne({ where: { id: ClienteId } });
            if (!buscarCliente) {
                res.send('El id del cliente no existe');
            } else {
                var buscarMesa = await Mesas.findOne({ where: { id: MesaId } });
                if (!buscarMesa) {
                    res.send('El id de la mesa no existe');
                } else {
                    await Reservaciones.create({
                        fechaHora,
                        ClienteId,
                        MesaId
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
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { fechaHora, ClienteId, MesaId } = req.body;
    if (!fechaHora || !ClienteId || !MesaId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarReservacion = await Reservaciones.findOne({ where: { id: id } });
        if (!buscarReservacion) {
            res.send('El id de la reservación no existe');
        } else {
            var buscarCliente = await Clientes.findOne({ where: { id: ClienteId } });
            if (!buscarCliente) {
                res.send('El id del cliente no existe');
            } else {
                var buscarMesa = await Mesas.findOne({ where: { id: MesaId } });
                if (!buscarMesa) {
                    res.send('El id de la mesa no existe');
                } else {
                    buscarReservacion.fechaHora = fechaHora;
                    buscarReservacion.ClienteId = ClienteId;
                    buscarReservacion.MesaId = MesaId
                    await buscarReservacion.save()
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

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Reservaciones.destroy({ where: { id: id } })
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