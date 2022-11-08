const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Insumos = db.define(
    'Insumos',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [4, 50],
                notEmpty: true
            }
        },

        marca: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [4, 50],
                notEmpty: true
            }
        },

        //TIPO DE FECHA
        //DE Vencimiento  == DD/MM/AAAA
        fechaVencimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true,
                notEmpty: true,
                isAfter: today.format('YYYY-MM-DD')
            }
        },

        precioUnitario: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isFloat: true,
                min: 1
            }
        },


    },
    {
        tableName: 'Insumos',
    }
);
module.exports = Insumos;