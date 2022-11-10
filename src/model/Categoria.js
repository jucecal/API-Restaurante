const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Categoria = db.define(

    'Categoria',
    {
        categoria: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: { 
                arg: true, 
                msg: 'No se permiten nombres de categorias duplicados' 
            },
            validate: {
                len: [3, 50],
                notEmpty: true
            }
        }
    },
    {
        tableName: 'Categorias',
    }
);
module.exports = Categoria;