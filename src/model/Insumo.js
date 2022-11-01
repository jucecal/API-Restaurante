const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
var today = moment();
const Insumos = db.define(
    'Insumos',
    {
        nombre:{ 
            type: DataTypes.STRING(50), 
            allowNull: false 
        },

        marca:{ 
            type: DataTypes.STRING(50), 
            allowNull: false 
        },

        //TIPO DE FECHA
        //DE Vencimiento  == DD/MM/AAAA
        fechaVencimiento:{ 
            type:DataTypes.DATEONLY, 
            allowNull:false, 
            validate:{
                isDate: true,
                notEmpty: true,
                isBefore: today.format('YYYY-MM-DD')
            }
        },

        precioUnitario:
        {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate:{
                isDecimal: true, 
                min: 1     
            }
        },

       
    },
    {
        tableName: 'Insumos',
    }
);
module.exports = Insumos;