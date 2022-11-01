const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Empleado = db.define(
    'Empleado',
    {
        nombre:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellido:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        nacimiento:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        direccion:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        telefono:
        {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        correo:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        
    },
    {
        tableName: 'empleados',
    }
);
module.exports = Empleado;