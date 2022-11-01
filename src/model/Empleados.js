const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Empleado = db.define(
    'Empleado',
    {
        nombre:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        apellido:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        fechaNacimiento:
        {
            type:DataTypes.DATEONLY, 
            allowNull: false, 
            validate:{
                isDate: true,
                notEmpty: true,
                isBefore: today.format('YYYY-MM-DD')
            }
        },

        direccion:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        telefono:
        {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        correo:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        
    },
    {
        tableName: 'empleados',
    }
);
module.exports = Empleado;