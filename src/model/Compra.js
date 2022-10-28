const { DataTypes} = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Compra = db.define(
    'Compra',
    {        
        fecha: 
        {
            type:DataTypes.DATE, allowNull:false, 
            validate:{
                isDate: true,
                notEmpty: true,
                isBefore: today.format('YYYY-MM-DD')
            }
        },
        total_pagar:
        {
            type: DataTypes.DOUBLE,allowNull: false,
            validate:{
                isDecimal: true, 
                min: 1     
            }
        }
                 
        
    },
    {
        tableName: 'compras'
    }
);
module.exports = Compra;


