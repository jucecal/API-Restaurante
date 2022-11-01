const { DataTypes } = require('sequelize');
const db = require('../config/db');
const detalleCompra = db.define(
    'detalleCompra',
    {
        cantidad:
        { type: DataTypes.INTEGER, allowNull: false },

        observaciones:
        { type: DataTypes.STRING(50), allowNull: false },

        subtotal:
        {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate:{
                isDecimal: true, 
                min: 1     
            }
        },
    },
    {
        tableName: 'detallecompras',
    }
);
module.exports = detalleCompra;