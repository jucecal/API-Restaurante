const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Proveedor = db.define(
    'Proveedor',
    {
        proveedor: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                notEmpty: true,
                isAlpha: true
            }
            
        },

        nombreContacto: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                notEmpty: true,
                isAlpha: true
            }
        },

        telefono: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate:{
                len:[8],
                isNumeric: true

            }
        },

    },
    {
        tableName: 'proveedores',
    }
);
module.exports = Proveedor;