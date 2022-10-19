const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Reservaciones = db.define(
    'Reservaciones',
    {
        fecha_hora:
        {
            type: DataTypes.TEXT, 
            allowNull: false
        }
    },
    {
        tableName: 'reservaciones',
    }
);
module.exports = Reservaciones;