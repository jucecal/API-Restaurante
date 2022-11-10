const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Clientes = db.define(
    'Clientes',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [4, 50],
                notEmpty: true
            }
        },

        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [4, 50],
                notEmpty: true
            }
        },

        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                arg: true, 
                msg: 'El telefono ya se encuentra asignado'
            },
        },

        //TIPO DE FECHA
        //DE NACIMIENTO  == AAAA-MM-DD
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