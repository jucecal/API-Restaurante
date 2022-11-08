const Menu = require('../model/Menu');
const Categoria = require('../model/Categoria');
const { validationResult } = require('express-validator');
const { request } = require('express');
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
    const moduloMenu = {
        modulo: 'menu',
        descripcion: 'Gestiona las operaciones con el modelo de menu',
        rutas: [
            {
                ruta: '/api/menu/listar',
                descripcion: 'Lista los productos del menu en el negocio',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/menu/buscarId',
                descripcion: 'Muestra un producto en específico del menu según el id ingresado',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/menu/buscarNombre',
                descripcion: 'Muestra el o los productos del menu que coincidan con el nombre ingresado',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/menu/buscarporCategoria',
                descripcion: 'Muestra el o los productos del menu que coincidan con el nombre de categoria ingresado',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/menu/guardar',
                descripcion: 'Guarda los datos de un producto del menu',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/menu/editar',
                descripcion: 'Modifica los datos de un producto del menu',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/menu/eliminar',
                descripcion: 'Elimina los datos de un producto del menu',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloMenu);
}

exports.Listar = async (req, res) => {
    const listarMenu = await Menu.findAll({
        attributes: [
            ['id', 'Código Producto'], 
            ['nombre', 'Nombre Producto'], 
            ['precio', 'Precio Producto'], 
            ['descripcion', 'Descripción Producto'], 
            ['imagen', 'Imagen Producto'], ['CategoriumId', 'Código Categoría']
        ],
        include: [{ 
            model: Categoria, 
            attributes: [
                ['categoria', 'Categoría Producto']
            ] 
        }]
    });
    res.json(listarMenu);
}

exports.BuscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { id } = req.query;
        const listarMenu = await Menu.findAll({
            attributes: [
                ['id', 'Código Producto'], 
                ['nombre', 'Nombre Producto'], 
                ['precio', 'Precio Producto'], 
                ['descripcion', 'Descripción Producto'], 
                ['imagen', 'Imagen Producto'], 
                ['CategoriumId', 'Código Categoría']],
            where: {
                id: id
            },
            include: [{ 
                model: Categoria, 
                attributes: [
                    ['categoria', 'Categoría Producto']
                ] 
            }]
        });
        res.json(listarMenu);
    }

}

exports.BuscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { nombre } = req.query;
        const listarMenu = await Menu.findAll({
            attributes: [
                ['id', 'Código Producto'], 
                ['nombre', 'Nombre Producto'], 
                ['precio', 'Precio Producto'], 
                ['descripcion', 'Descripción Producto'], 
                ['imagen', 'Imagen Producto'], 
                ['CategoriumId', 'Código Categoría']
            ],
            where: {
                nombre: { 
                    [Op.like]: nombre 
                }
            },
            include: [{ 
                model: Categoria, 
                attributes: [
                    ['categoria', 'Categoría Producto']
                ] 
            }]
        });
        res.json(listarMenu);
    }

}

exports.BuscarPorCategoria = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { nombre } = req.query;
        const listarMenu = await Menu.findAll({
            attributes: [
                ['id', 'Código Producto'], 
                ['nombre', 'Nombre Producto'], 
                ['precio', 'Precio Producto'], 
                ['descripcion', 'Descripción Producto'], 
                ['imagen', 'Imagen Producto'], 
                ['CategoriumId', 'Código Categoría']],
            include: [{ 
                model: Categoria, 
                attributes: [
                    ['categoria', 'Categoría Producto']
                ], 
                where: { 
                    Categoria: {
                        [Op.like]: nombre 
                    } 
                } 
            }]
        });
        res.json(listarMenu);
    }

}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'errores en los datos enviados' })
    }
    else {
        const { nombre, precio, descripcion, CategoriumId } = req.body;
        if (!nombre || !precio || !descripcion || !CategoriumId) {
            res.json({ msj: 'Debe enviar los datos completos' })
        }
        else {
            var buscarCategoria = await Categoria.findOne({ where: { id: CategoriumId } });
            if (!buscarCategoria) {
                res.send('El id de la categoría no existe');
            } else {
                await Menu.create({
                    nombre,
                    precio,
                    descripcion,
                    CategoriumId
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

}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { nombre, precio, descripcion, CategoriumId } = req.body;

    if (!nombre || !id || !precio || !descripcion || !CategoriumId) {
        res.json({ msj: 'Debe enviar los datos completos' });
    }
    else {
        var buscarMenu = await Menu.findOne({ where: { id: id } });
        if (!buscarMenu) {
            res.send('El id del producto del menu no existe');
        }
        else {
            var buscarCategoria = await Categoria.findOne({ where: { id: CategoriumId } });
            if (!buscarCategoria) {
                res.send('El id de la categoría no existe');
            } else {
                buscarMenu.nombre = nombre;
                buscarMenu.precio = precio;
                buscarMenu.descripcion = descripcion;
                buscarMenu.CategoriumId = CategoriumId;
                await buscarMenu.save()
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
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    }
    else {
        await Menu.destroy({ where: { id: id } })
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

exports.RecibirImagen = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.body;
    //console.log(req);
    console.log(filename);
    try {
        errores = [];
        data = [];
        var buscarMenu = await Menu.findOne({ where: { id } });
        if (!buscarMenu) {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/menu/' + filename));
            if (!buscarImagen)
                console.log('La imagen no existe');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/menu/' + filename));
                console.log('Imagen eliminada');
            }
            error.msg = 'El id del producto no existe. Se elimino la imagen enviada';
            error.parametro = 'id';
            errores.push(error);
            MSJ("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/menu/' + buscarMenu.imagen));
            if (!buscarImagen)
                console.log('No encontro la imagen');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/menu/' + buscarMenu.imagen));
                console.log('Imagen eliminada');
            }
            buscarMenu.imagen = filename;
            await buscarMenu.save()
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