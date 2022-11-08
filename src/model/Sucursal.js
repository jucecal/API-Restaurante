const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Sucursal = db.define(
    'Sucursal',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [4, 50],
                notEmpty: true
            }
        },

        ubicacion: {
            type: DataTypes.STRING(50),
            allowNull: false,validate: {
                len: [4, 50],
                notEmpty: true
            }
        },

        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                isInt: true
            }
        }
    },
    {
        tableName: 'Sucursales',
    }
);
module.exports = Sucursal;