const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Factura = db.define(
    'Factura',
    {
        fecha:
        {
            type: DataTypes.DATE, 
            allowNull: false
        },

        ISV:
        {
            type: DataTypes.DECIMAL, 
            allowNull: false
        },

        totalPagar:
        {
            type: DataTypes.DECIMAL, 
            allowNull: false
        },

        efectivo:
        {
            type: DataTypes.DECIMAL, 
            allowNull: false
        },

        cambio:
        {
            type: DataTypes.DECIMAL, 
            allowNull: true
        }
    },
    {
        tableName: 'factura',
    }
);
module.exports = Factura;