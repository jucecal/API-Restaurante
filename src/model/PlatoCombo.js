const { DataTypes} = require('sequelize');
const db = require('../config/db');
const PlatoCombo = db.define(
    'PlatoCombo',
    {
        
    },
    {
        tableName: 'Plato_X_Combo',
    }

);
    
module.exports = PlatoCombo;
