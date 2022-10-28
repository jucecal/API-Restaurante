const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Tipo= db.define(
    'Tipos',
    {
        tipo:
        {
            type: DataTypes.STRING(50), 
            allowNull: false
        }
    },
    {
        tableName: 'tipos',
    }
);
module.exports = Tipo;