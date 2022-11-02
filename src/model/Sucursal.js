const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Sucursal = db.define(
    'Sucursal',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        ubicacion: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        telefono: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        tableName: 'Sucursales',
    }
);
module.exports = Sucursal;