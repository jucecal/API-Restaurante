const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Mesas = db.define(
    'Mesas',
    {
        capacidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'Mesas',
    }
);
module.exports = Mesas;