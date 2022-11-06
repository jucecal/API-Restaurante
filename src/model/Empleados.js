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
            type: DataTypes.STRING(20),
            allowNull: false,
            validate:{
                len:[8],
                isNumeric: true

            }
        },

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