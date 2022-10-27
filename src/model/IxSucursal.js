const { DataTypes } = require('sequelize');
const db = require('../config/db');
const IxSucursal = db.define(
    'IxSucursal',
    {
        Stock:
        {
            type: DataTypes.STRING, 
            allowNull: false
        }
    },
    {
        tableName: 'IxSucursales',
    }
);
module.exports = IxSucursal;