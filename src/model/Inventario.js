const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Inventario = db.define(
    'Inventario',
    {
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        }
    },
    {
        tableName: 'Inventario',
    }
);
module.exports = Inventario;