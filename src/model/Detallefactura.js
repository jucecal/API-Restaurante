const { DataTypes } = require('sequelize');
const db = require('../config/db');
const DetalleFactura = db.define(
    'DetalleFactura',
    {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                notEmpty: true
            }
        },

        subTotal: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isFloat: true,
                min: 1
            }
        },

        estado: {
            type: DataTypes.ENUM('AC', 'IN', 'BL'),
            allowNull: false,
            defaultValue: 'AC',
            validate: {
                isIn: [['AC', 'IN', 'BL']]
            }
        }
    },
    {
        tableName: 'Detalle_Factura',
    }
);
module.exports = DetalleFactura;