const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Empleado = db.define(
    'Empleado',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                notEmpty: true,
                isAlpha: true
            }
        },

        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                notEmpty: true,
                isAlpha: true
            }
        },

        telefono: {
            type: DataTypes.INTEGER(20),
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
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{ 
                len:[3,50]
            }
        },

        imagen: {
            type: DataTypes.STRING(250),
            allowNull: true
        }        
    },
    {
        tableName: 'empleados',
    }
);
module.exports = Empleado;