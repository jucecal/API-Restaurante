const { DataTypes } = require('sequelize');
const db = require('../config/db');
const PxPlato = db.define(
    'PxPlato',
    {
        cantidad:
        {
            type: DataTypes.INTEGER, 
            allowNull: false
        }
    },
    {
        tableName: 'PxPlatos',
    }
);
module.exports = PxPlato;