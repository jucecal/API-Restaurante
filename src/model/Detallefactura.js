const { DataTypes } = require('sequelize');
const db = require('../config/db');
const DetalleFactura = db.define(
    'DetalleFactura',
    {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        subTotal: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isDecimal: true, min: 1
            }
        },

        estado: {
            type: DataTypes.ENUM('AC', 'IN', 'BL'),
            allowNull: false,
            defaultValue: 'AC'
        }
    },
    {
        tableName: 'Detalle_Factura',
    }
);
module.exports = DetalleFactura;