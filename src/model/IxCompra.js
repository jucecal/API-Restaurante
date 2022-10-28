const { DataTypes } = require('sequelize');
const db = require('../config/db');
const IxCompra = db.define(
    'IxCompra',
    {
        nombre:
        {
            type: DataTypes.STRING(50), 
            allowNull: false
        },

        marca:
        {
            type: DataTypes.STRING(50), 
            allowNull: false
        },

        //TIPO DE FECHA
        //DE Vencimiento  == DD/MM/AAAA
        vencimiento:
        {
            type: DataTypes.STRING(10),
            allowNull: false
        },

        preciounitario:
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
        tableName: 'ixcompras',
    }
);
module.exports = IxCompra;