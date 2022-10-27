const { DataTypes} = require('sequelize');
const db = require('../configuraciones/db');
const IxProd = db.define(
    'IxProd',
    {
        idProducto: { type: DataTypes.INTEGER, primaryKey:true, allowNull: false, autoIncrement: true },
        idIngrediente: { type: DataTypes.INTEGER, primaryKey:true, allowNull: false, autoIncrement: true },

    },
    {
        tableName: 'IxProds',
    }

);
    
module.exports = IxProd;
