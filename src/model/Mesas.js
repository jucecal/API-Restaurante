const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Mesas = db.define(
    'Mesas',
    {
        capacidad:
        {
            type: DataTypes.STRING(50), 
            allowNull: false
        }
    },
    {
        tableName: 'mesas',
    }
);
module.exports = Mesas;