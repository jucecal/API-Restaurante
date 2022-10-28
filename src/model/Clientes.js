const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Clientes = db.define(
    'Clientes',
    {
        nombres:
        { type: DataTypes.STRING(50), allowNull: false },

        apellidos:
        { type: DataTypes.STRING(50), allowNull: false },

        telefono:
        { type: DataTypes.TEXT, allowNull: false },

        //TIPO DE FECHA
        //DE NACIMIENTO  == DD/MM/AAAA
        nacimiento:
        {type: DataTypes.STRING(10), allowNull: false },

        correo:
        { type: DataTypes.STRING(100), allowNull: false },

        direccion:
        { type: DataTypes.STRING(250), allowNull: false }
    },
    {
        tableName: 'clientes',
    }
);
module.exports = Clientes;