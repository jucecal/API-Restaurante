const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var hora = moment();
const Compra = db.define(
    'Compra',
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

        totalPagar: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isFloat: true,
            }
        },

        imagen: {
            type: DataTypes.STRING(250),
            allowNull: true
        }
    },
    {
        tableName: 'Compras'
    }
);
module.exports = Compra;


