const IxSucursal= require('../model/IxSucursal');
const { validationResult } = require('express-validator');
const {request} = require('express');

exports.Inicio = (req, res) => {
    const moduloIxSucursal = {
        modulo: 'ixsucursales',
        descripcion: 'Gestiona las operaciones con el modelo de Sucursales',
        rutas: [
            {
                ruta: '/api/ixsucursales/listar',
                descripcion: 'Listar las Sucursales',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/ixsucursales/guardar',
                descripcion: 'Guardar las Sucursales',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/ixsucursales/editar',
                descripcion: 'Modifica las Sucursales',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/ixsucursales/eliminar',
                descripcion: 'Elimina las Sucursales',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloIxSucursal);
}
exports.Listar = async (req, res) => {
    const listarIxSucursal = await IxSucursal.findAll();
    res.json(listarIxSucursal);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { stock } = req.body;
        console.log(stock);
        if (!stock) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            await IxSucursal.create({
               stock
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
    const { stock } = req.body;
    if (!stock || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarIxSucursal= await IxSucursal.findOne({ where: { id: id } });
        if (!buscarIxSucursal) {
            res.send('El id del tipo no existe');
        } else {
            buscarIxSucursal.stock = stock;
            await buscarIxSucursal.save()
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
        await IxSucursal.destroy({ where: { id: id } })
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