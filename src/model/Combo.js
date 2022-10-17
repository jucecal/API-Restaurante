const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Combo = db.define(
    'Combo',
    {
        combo:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        precio:
        {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
    },
    {
        tableName: 'combos',
    }
);
module.exports = Combo;