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
                isDate: true,
                notEmpty: true
            }
        },

        ISV: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },

        totalPagar: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },

        efectivo: {
            type: DataTypes.DOUBLE,
            allowNull: false
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