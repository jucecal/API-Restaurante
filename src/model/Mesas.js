const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Mesas = db.define(
    'Mesas',
    {
        capacidad:
        {
            type: DataTypes.INTEGER, allowNull: false
        }
    },
    {
        tableName: 'mesas',
    }
);
module.exports = Mesas;