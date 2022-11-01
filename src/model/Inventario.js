const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Inventario = db.define(
    'Inventario',
    {
        Stock:{ 
        type: DataTypes.STRING, 
        allowNull: false 
        }
    },
    {
        tableName: 'Inventario',
    }
);
module.exports = Inventario;