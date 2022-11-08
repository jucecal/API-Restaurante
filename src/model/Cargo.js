const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Cargo = db.define(
    'Cargo',
    {
        nombre:
        {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: { 
                arg: true, 
                msg: 'No se permiten nombres de cargo duplicados' 
            },
            validate: {
                len: [3, 50],
                notEmpty: true
            }
        }
    },
    {
        tableName: 'Cargos'
    }
);
module.exports = Cargo;


