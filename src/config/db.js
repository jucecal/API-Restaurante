const { Sequelize } = require('sequelize')
const sequelize = require('sequelize')
const db = new sequelize(
    'restaurante', //NOMBRE DE LA BASE DE DATOS.
    'root', //USUARIO DE BASE DE DATOS.
    '', //CONTRASEÑA DE USUARIO.
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306',
    }
)
module.exports = db