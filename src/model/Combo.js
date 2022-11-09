const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Combo = db.define(
    'Combo',
    {
        combo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [4, 50],
                notEmpty: true
            }
        },

        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isFloat: true,
                min: 1
            }
        },
        
        descripcion: {
            type: DataTypes.STRING(250),
            allowNull: true,
            validate: {
                len: [3, 250],
                notEmpty: true
            }
        },

        imagen: {
            type: DataTypes.STRING(250),
            allowNull: true
        }        
    },
    {
        tableName: 'Combos',
    }
);
module.exports = Combo;