const { validationResult } = require('express-validator');
const Usuario = require('../model/Usuario');
const Cliente = require('../model/Clientes');
const Empleado = require('../model/Empleados');
const { Op } = require('sequelize');
const msjRes = require('../components/mensaje');
const EnviarCorreo = require('../config/correo');
const gpc = require('generate-pincode');
const passport = require('../config/passport');
const bcrypt = require('bcrypt');
function validacion(req) {
    var errores = [];
    var validaciones = validationResult(req);
    var error = {
        mensaje: '',
        parametro: '',
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });
    }
    return errores;
};

exports.Inicio = async (req, res) => {
    var errores = validacion(req);
    const listaModulos =
        [
            {
                modulo: "Autenticación",
                rutas: [
                    {
                        ruta: "/api/autenticacion",
                        metodo: "get",
                        parametros: "",
                        descripcion: "Inicio del módulo de autenticación"
                    },
                    {
                        ruta: "/api/autenticacion/pin",
                        metodo: "post",
                        parametros: {
                            correo: "Correo electronico del usuario, al que se le enviara un correo con el pin. Obligatorio."
                        },
                        descripcion: "Envio de pin de recuperación de contraseña al correo electrónico."
                    },
                    {
                        ruta: "/api/autenticacion/recuperarcontrasena",
                        metodo: "put",
                        parametros: {
                            usuario: "login o correo del usuario. Obligatorio.",
                            pin: "Pin enviado al correo del usuario. Obligatorio.",
                            contrasena: "Nueva contrasena de usuario. Obligatorio.",
                        },
                        descripcion: "Actualiza la contraseña del usuario"
                    },
                    {
                        ruta: "/api/autenticacion/iniciosesion",
                        metodo: "post",
                        parametros:
                        {
                            usuario: "Login o correo de usuario. Obligatorio",
                            contrasena: "Contraseña del usuario. Obligatorio.",
                        },
                        descripcion: "Genera el token para poder acceder a las rutas del usuario"
                    },
                ],
            }
        ];
    const datos = {
        api: "API-RESTAURANTE COME RICO",
        descripcion: "Interfaz de progamación para el sistema de gestión del restaurante",
        propiedad: "GRUPO 6",
        desarrolladores: "Julio Caballero, Jorge Samuel Tovar, Jesús López, Daniel Castellanos, Guillermo Ardón, Denisse García",
        fecha: "8/11/2022",
        listaModulos
    };
    msjRes("Peticion ejecutada correctamente", 200, datos, errores);
};

exports.Pin = async (req, res) => {
    var errores = validacion(req);
    console.log(errores);
    if (errores.length > 0) {
        msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
    }
    else {
        const { correo } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        });
        if (!buscarUsuario) {
            errores = [
                {
                    mensaje: "El correo no existe o no esta vinculado con ningun usuario",
                    parametro: "correo"
                },
            ];
            msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else {
            const pin = gpc(4);
            const data = {
                correo: correo,
                pin: pin
            };
            console.log(pin);
            if (await EnviarCorreo.EnviarCorreo(data)) {
                buscarUsuario.codigo = pin;
                await buscarUsuario.save();
                msjRes("Peticion ejecutada correctamente", 200, { msj: 'Correo Enviado' }, errores, res);
            }
            else {
                errores = [
                    {
                        mensaje: "Error al enviar el correo",
                        parametro: "correo"
                    }
                ];
                msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
            }

        }
    }
};

exports.Recuperar = async (req, res) => {
    var msj = validacion(req);
    console.log(msj);
    if (msj.length > 0) {
        msjRes("Peticion ejecutada correctamente", 200, [], msj, res);
    }
    else {
        const busuario = req.query.usuario;
        const { pin, contrasena } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where: {
                [Op.or]: {
                    correo: busuario,
                    nombre: busuario
                },
            }
        });
        console.log(buscarUsuario);
        if (!buscarUsuario) {
            var errores = [
                {
                    mensaje: "El correo o nombre de usuario no existe",
                    parametro: "usuario"
                },
            ];
            msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else {
            if (pin != buscarUsuario.codigo) {
                var errores = [
                    {
                        mensaje: "El pin es incorrecto o ha expirado",
                        parametro: "pin"
                    },
                ];
                msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
            }
            else {

                buscarUsuario.password = contrasena;
                buscarUsuario.estado = 'AC';
                buscarUsuario.fallidos = 0;
                buscarUsuario.codigo = '0000';
                await buscarUsuario.save()
                    .then((data) => {
                        console.log(data);
                        msjRes("Peticion ejecutada correctamente", 200, data, [], res);
                    })
                    .catch((error) => {
                        msjRes("Peticion ejecutada correctamente", 200, [], error, res);
                    });
            }
        }
    }
};

exports.Error = async (req, res) => {
    var errores = [
        {
            mensaje: "Debe enviar las credenciales correctas",
            parametro: "autenticacion"
        },
    ];
    msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
};

exports.InicioSesionCliente = async (req, res) => {
    var msj = validacion(req);
    if (msj.length > 0) {
        msjRes("Peticion ejecutada correctamente", 200, [], msj, res);
    }
    else {
        try {
            const { usuario, contrasena } = req.body;
            var buscarUsuario = await Usuario.findOne({
                attributes: ['id', 'nombre', 'correo', 'password'],
                where: {
                    [Op.or]: {
                        nombre: usuario,
                        correo: usuario
                    },
                    estado: 'AC',
                }

            });
            if (!buscarUsuario) {
                var errores = [
                    {
                        mensaje: "El usuario no existe o se encuentra bloqueado",
                        parametro: "usuario"
                    },
                ];
                msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
            }
            else {
                var buscarCliente = await Cliente.findOne({
                    attributes: ['nombre', 'apellido', 'imagen', 'telefono', 'direccion'],
                    where: {
                        UsuarioId: buscarUsuario.id
                    }

                });
                console.log(buscarUsuario);
                if (buscarUsuario.VerificarContrasena(contrasena, buscarUsuario.password)) {
                    const token = passport.getToken({ id: buscarUsuario.id });
                    const data = {
                        token: token,
                        usuario: {
                            usuario: buscarUsuario.nombre,
                            correo: buscarUsuario.correo,
                            nombre: buscarCliente.nombre,
                            apellido: buscarCliente.apellido,
                            imagen: buscarCliente.imagen,
                            telefono: buscarCliente.telefono,
                            direccion: buscarCliente.direcion,
                        }
                    };
                    msjRes("Peticion ejecutada correctamente", 200, data, [], res);
                }
                else {
                    var errores = [
                        {
                            mensaje: "El usuario no existe o la contraseña es incorrecta",
                            parametro: "contrasena"
                        },
                    ];
                    buscarUsuario.fallidos = buscarUsuario.fallidos + 1;
                    await buscarUsuario.save()
                        .then((data) => {
                            console.log(data);
                        }).catch((er) => {
                            console.log(er);
                            errores = er;
                        });
                    msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
                }
            }
        } catch (error) {
            console.log(error);
            errores = "Error al conectar con la base de datos";
            msjRes("Error al Ejecutar la Peticion", 500, [], errores, res);
        }

    }
};


exports.InicioSesionEmpleado = async (req, res) => {
    var msj = validacion(req);
    if (msj.length > 0) {
        msjRes("Peticion ejecutada correctamente", 200, [], msj, res);
    }
    else {
        try {
            const { usuario, contrasena } = req.body;
            var buscarUsuario = await Usuario.findOne({
                attributes: ['id', 'nombre', 'correo', 'password'],
                where: {
                    [Op.or]: {
                        nombre: usuario,
                        correo: usuario
                    },
                    estado: 'AC',
                }

            });
            if (!buscarUsuario) {
                var errores = [
                    {
                        mensaje: "El usuario no existe o se encuentra bloqueado",
                        parametro: "usuario"
                    },
                ];
                msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
            }
            else {
                var buscarEmpleado = await Empleado.findOne({
                    attributes: ['nombre', 'apellido', 'imagen', 'telefono', 'direccion'],
                    where: {
                        UsuarioId: buscarUsuario.id
                    }

                });
                console.log(buscarUsuario);
                if (buscarUsuario.VerificarContrasena(contrasena, buscarUsuario.password)) {
                    const token = passport.getToken({ id: buscarUsuario.id });
                    const data = {
                        token: token,
                        usuario: {
                            usuario: buscarUsuario.nombre,
                            correo: buscarUsuario.correo,
                            nombre: buscarEmpleado.nombre,
                            apellido: buscarEmpleado.apellido,
                            imagen: buscarEmpleado.imagen,
                            telefono: buscarEmpleado.telefono,
                            direccion: buscarEmpleado.direcion,
                        }
                    };
                    msjRes("Peticion ejecutada correctamente", 200, data, [], res);
                }
                else {
                    var errores = [
                        {
                            mensaje: "El usuario no existe o la contraseña es incorrecta",
                            parametro: "contrasena"
                        },
                    ];
                    buscarUsuario.fallidos = buscarUsuario.fallidos + 1;
                    await buscarUsuario.save()
                        .then((data) => {
                            console.log(data);
                        }).catch((er) => {
                            console.log(er);
                            errores = er;
                        });
                    msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
                }
            }
        } catch (error) {
            console.log(error);
            errores = "Error al conectar con la base de datos";
            msjRes("Error al Ejecutar la Peticion", 500, [], errores, res);
        }

    }
};