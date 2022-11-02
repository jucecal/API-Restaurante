const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Usuario = db.define(
    'Usuario',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        correo: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        tableName: 'Usuarios',
    }
);
module.exports = Usuario;