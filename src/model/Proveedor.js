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
                notEmpty: true
            }
            
        },

        nombreContacto: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                notEmpty: true
            }
        },

        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                arg: true, 
                msg: 'El teléfono ya se encuentra asignado'
            },
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