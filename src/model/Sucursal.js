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
            type: DataTypes.STRING(100),
            allowNull: false,validate: {
                len: [4, 50],
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
                isNumeric: true,
                notEmpty: true
            }
        }
    },
    {
        tableName: 'Sucursales',
    }
);
module.exports = Sucursal;