const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Categoria = db.define(

    'Categoria',
    {
        categoria: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        tableName: 'Categorias',
    }
);
module.exports = Categoria;