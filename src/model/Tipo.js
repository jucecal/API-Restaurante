const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Tipo= db.define(
    'Tipo',
    {
        tipo:
        {
            type: DataTypes.STRING(50), 
            allowNull: false
        }
    },
    {
        tableName: 'Tipos',
    }
);
module.exports = Tipo;