const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Inventario = db.define(
    'Inventario',
    {
        Stock:{ 
        type: DataTypes.INTEGER, 
        allowNull: false 
        }
    },
    {
        tableName: 'Inventario',
    }
);
module.exports = Inventario;