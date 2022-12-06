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
                msg: 'El teléfono ya se encuentra asignado'
            },
            validate:{
                len:[8],
                isNumeric: true,
                notEmpty: true
            }
        },

        direccion: {
            type: DataTypes.STRING(250),
            allowNull: true,
            validate: {
                len: [4, 250]
            }
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