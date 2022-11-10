const { DataTypes } = require('sequelize');
const db = require('../config/db');
const detalleCompra = db.define(
    'detalleCompra',
    {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                notEmpty: true
            }
        },

        observaciones: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                len: [3, 50]
            }
        },

        subTotal:
        {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isFloat: true,
                min: 1
            }
        },
    },
    {
        tableName: 'Detalle_Compra',
    }
);
module.exports = detalleCompra;