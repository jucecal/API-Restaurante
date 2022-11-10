const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var hora = moment();
const Factura = db.define(
    'Factura',
    {
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                notEmpty: true
            }
        },

        hora: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            defaultValue: hora.format('h:mm:ss')
        },

        ISV: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            validate: {
                isFloat: true,
                notEmpty: true
            }
        },

        totalPagar: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            validate: {
                isFloat: true,
                notEmpty: true
            }
        },

        /*
        efectivo: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        cambio: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
        */
    },
    {
        tableName: 'factura',
    }
);
module.exports = Factura;