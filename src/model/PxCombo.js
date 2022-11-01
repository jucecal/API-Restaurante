const { DataTypes} = require('sequelize');
const db = require('../config/db');
const PxCombo = db.define(
    'PxCombo',
    {
        /*
        idPlato: { type: DataTypes.INTEGER, primaryKey:true, allowNull: false, autoIncrement: true },
        idCombo: { type: DataTypes.INTEGER, primaryKey:true, allowNull: false, autoIncrement: true },
        */
    },
    {
        tableName: 'PxCombos',
    }

);
    
module.exports = PxCombo;
