const { DataTypes} = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Compra = db.define(
    'Compra',
    {        
        fecha: {
            type:DataTypes.DATEONLY, 
            allowNull: false, 
            validate:{
                isDate: true,
                notEmpty: true,
                isBefore: today.format('YYYY-MM-DD')
            }
        },

        totalPagar: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate:{
                isDecimal: true, 
                min: 1     
            }
        },

        imagen: {
            type: DataTypes.STRING(250), 
            allowNull: true
        }
                 
        
    },
    {
        tableName: 'Compras'
    }
);
module.exports = Compra;


