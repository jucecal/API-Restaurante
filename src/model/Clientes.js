const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Clientes = db.define(
    'Clientes',
    {
        nombres:
        {
            type: DataTypes.STRING(50), 
            allowNull: false
        },

        apellidos:
        {
            type: DataTypes.STRING(50), 
            allowNull: false
        },

        telefono:
        {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: 'clientes',
    }
);
module.exports = Clientes;