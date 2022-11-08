const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Tipo = db.define(
    'Tipo',
    {
        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            allowNull: false,
            validate: {
                len: [4, 50],
                notEmpty: true
            }
        }
    },
    {
        tableName: 'Tipos',
    }
);
module.exports = Tipo;