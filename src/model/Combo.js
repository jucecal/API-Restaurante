const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Combo = db.define(
    'Combo',
    {
        combo: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isDecimal: true,
                min: 1
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