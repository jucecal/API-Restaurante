const Detallefactura = require('../model/Detallefactura');
const { validationResult } = require('express-validator');
const {request} = require('express');

exports.Inicio = (req, res) => {
    const moduloDetallefactura = {
        modulo: 'detallefacturas',
        descripcion: 'Gestiona las operaciones con el modelo de Detalle Factura',
        rutas: [
            {
                ruta: '/api/detallefacturas/listar',
                descripcion: 'Listar los detalles de factura',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/detallefacturas/guardar',
                descripcion: 'Guardar los detalles de factura',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/detallefacturas/editar',
                descripcion: 'Modifica los detalles de factura',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/detallefacturas/eliminar',
                descripcion: 'Elimina los detalles de factura',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloDetallefactura);
}

exports.Listar = async (req, res) => {
    const listarDetallefactura = await Detallefactura.findAll();
    res.json(listarDetallefactura);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { cantidad, subtotal, estado } = req.body;
        console.log(cantidad);
        if (!cantidad || !subtotal || !estado) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            await Detallefactura.create({
                cantidad: cantidad,
                subtotal: subtotal,
                estado: estado

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
    const { cantidad, subtotal, estado } = req.body;
    if (!cantidad || !subtotal || !estado || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarDetallefactura= await Tipo.findOne({ where: { id: id } });
        if (!buscarDetallefacturas) {
            res.send('El id del tipo no existe');
        } else {
            buscarDetallefactura.cantidad = cantidad;
            await buscarDetallefactura.save()
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
        await Detallefactura.destroy({ where: { id: id } })
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