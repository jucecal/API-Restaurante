const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Reservaciones = db.define(
    'Reservaciones',
    {
        fechaHora:{
            type:DataTypes.DATEONLY, 
            allowNull:false, 
            validate:{
                isDate: true,
                notEmpty: true,
                isBefore: today.format('YYYY-MM-DD')
            }
        }
    },
    {
        tableName: 'Reservaciones',
    }
);
module.exports = Reservaciones;