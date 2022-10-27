const Compra = require('../model/Compra');
const Sucursal = require('../model/Sucursal');
const { validationResult } = require('express-validator');
const { request } = require('express');
const { Op } = require('sequelize');

exports.Inicio = (req, res) => {
    const moduloCompra = {
        modulo: 'compras',
        descripcion: 'Gestiona las operaciones con el modelo de compras',
        rutas: [
            {
                ruta: '/api/compras/listar',
                descripcion: 'Listar las compras realizadas',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/guardar',
                descripcion: 'Guardar los datos de una compra',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/editar',
                descripcion: 'Modificar los datos de una compra',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/compras/eliminar',
                descripcion: 'Eliminar los datos de una compra',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloCompra);
}

exports.Listar = async (req, res) => {
    const listarCompras = await Compra.findAll();
    res.json(listarCompras);
}

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarCompra = await Compra.findAll({
            where: {
                id
            }
        });
        res.json(listarCompra);
    }
}

exports.buscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.query;
        const listarCompra = await Compra.findAll({
            attributes:['nombre', 'ubicacion', 'telefono'],
            where: {
                [Op.and]: {
                    nombre: {
                        [Op.like]: nombre
                    },
                    activo: true
                }
            }
        });
        res.json(listarSucursal);
    }
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion.errors);
        res.json({msj: 'errores en los datos enviados'})
    }
    else{
        const {fecha, total_pagar, SucursalId} = req.body;
        
        if(!fecha || !total_pagar || !SucursalId){
            res.json({msj:'Debe enviar los datos completos'})
        }
        else{
            var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
            if (!buscarSucursal) {
                res.send('El id de la sucursal no existe');
            }else{
                await Compra.create({
                    fecha,
                    total_pagar,
                    SucursalId
                }).then((data)=>{
                    res.json({msj:'Registro guardado'})
                })
                .catch((er)=>{
                    var errores = '';
                    er.errors.forEach(element => {
                        console.log(element.message)
                        errores += element.message + '. ';
                    });
                    res.json({errores});
                    
                });
            }
            
            
        }
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { fecha, total_pagar, SucursalId} = req.body;
    if (!fecha || !total_pagar || !SucursalId || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarCompra = await Compra.findOne({ where: { id: id } });
        if (!buscarCompra) {
            res.send('El id de la compra no existe');
        } else {
            buscarCompra.fecha = fecha;
            buscarCompra.total_pagar = total_pagar;
            buscarCompra.SucursalId = SucursalId;
            
            var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
            if (!buscarSucursal) {
                res.send('El id de la sucursal no existe');
            }else{
                await buscarCompra.save()
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

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Compra.destroy({ where: { id: id } })
            .then((data) => {
                if(data==0){
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