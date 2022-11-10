const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var hora = moment();
const Reservaciones = db.define(
    'Reservaciones',
    {
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                notEmpty: true,
                isAfter: today.format('YYYY-MM-DD')
            }
        },
        
        hora: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        tableName: 'Reservaciones',
    }
);
module.exports = Reservaciones;