const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Compra = db.define(
    'Compra',
    {
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        totalPagar: {
            type: DataTypes.DOUBLE,
            allowNull: false,
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


