const ProductoPlato = require('../model/ProductoPlato');
const Menu = require('../model/Menu');
const Insumo = require('../model/Insumo');
const { validationResult } = require('express-validator');
const { request } = require('express');

exports.Inicio = (req, res) => {
    const moduloPxPlato = {
        modulo: 'prodplato',
        descripcion: 'Gestiona las operaciones con el modelo de platos',
        rutas: [
            {
                ruta: '/api/prodplato/listar',
                descripcion: 'Listar los Platps',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/prodplato/guardar',
                descripcion: 'Guardar los datos del plato',
                metodo: 'POST',
                parametros: {
                    MenuId: "Id del producto del menu. Obligatorio",
                    InsumoId: "Id del insumo. Obligatorio"
                }
            },
            {
                ruta: '/api/prodplato/editar',
                descripcion: 'Modifica los datos de los platos',
                metodo: 'PUT',
                parametros: {
                    MenuId: "Id del producto del menu. Obligatorio",
                    InsumoId: "Id del insumo. Obligatorio"
                }
            },
            {
                ruta: '/api/prodplato/eliminar',
                descripcion: 'Elimina los datos de los platos',
                metodo: 'DELETE',
                parametros: {
                    id: "Eliminar registro de los productos y platos"
                }
            }
        ]
    }
    res.json(moduloPxPlato);
}

exports.Listar = async (req, res) => {
    const listarPxPlato = await ProductoPlato.findAll({
        attributes: [
            ['cantidad', 'Cantidad'],
        ],
        include: [
            {
                model: Insumo,
                attributes: [
                    ['nombre', 'Producto']
                ]
            },
            {
                model: Menu,
                attributes: [
                    ['nombre', 'Plato']
                ]
            }
        ]
    });
    res.json(listarPxPlato);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        console.log(req);
        const { cantidad, MenuId, InsumoId } = req.body;
        if (!cantidad || !MenuId || !InsumoId) {
            res.json({ msj: 'Debe enviar los datos completos' });
        } else {
            var buscarMenu = await Menu.findOne({ where: { id: MenuId } });
            if (!buscarMenu) {
                res.send('El id del producto del menu no existe');
            } else {
                var buscarInsumo = await Insumo.findOne({ where: { id: InsumoId } });
                if (!buscarInsumo) {
                    res.send('El id del insumo no existe');
                } else {
                    await ProductoPlato.create({
                        cantidad,
                        MenuId,
                        InsumoId
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

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { cantidad, MenuId, InsumoId } = req.body;
    if (!cantidad || !MenuId || !InsumoId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarPxPlato = await ProductoPlato.findOne({ where: { id: id } });
        if (!buscarPxPlato) {
            res.send('El id del producto no existe');
        } else {
            var buscarMenu = await Menu.findOne({ where: { id: MenuId } });
            if (!buscarMenu) {
                res.send('El id del menu no existe');
            } else {
                var buscarInsumo = await Insumo.findOne({ where: { id: InsumoId } });
                if (!buscarInsumo) {
                    res.send('El id del insumo no existe');
                } else {
                    buscarPxPlato.cantidad = cantidad;
                    buscarPxPlato.MenuId = MenuId;
                    buscarPxPlato.InsumoId = InsumoId;
                    await buscarPxPlato.save()
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

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await ProductoPlato.destroy({ where: { id: id } })
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