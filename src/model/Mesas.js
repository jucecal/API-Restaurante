const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Mesas = db.define(
    'Mesas',
    {
        capacidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        }
    },
    {
        tableName: 'Mesas',
    }
);
module.exports = Mesas;