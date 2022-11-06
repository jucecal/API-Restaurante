const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Clientes = db.define(
    'Clientes',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        telefono: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        //TIPO DE FECHA
        //DE NACIMIENTO  == DD/MM/AAAA
        fechaNacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                notEmpty: true,
                isBefore: today.format('YYYY-MM-DD')
            }
        },

        direccion: {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        imagen: {
            type: DataTypes.STRING(250),
            allowNull: true
        }
    },
    {
        tableName: 'Clientes',
    }
);
module.exports = Clientes;