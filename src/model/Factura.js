const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Factura = db.define(
    'Factura',
    {
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        ISV: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },

        totalPagar: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            validate: {
                isFloat: true,
                notEmpty: true
            }
        },

        efectivo: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isFloat: true,
                notEmpty: true
            }
        },

        cambio: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    },
    {
        tableName: 'factura',
    }
);
module.exports = Factura;