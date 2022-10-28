const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Empleado = db.define(
    'Empleado',
    {
        idempleado:
        {

            type: DataTypes.INTEGER,primaryKey:true, allowNull:false, autoIncrement: true,
            allowNull: false
        },

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
        idsurcursal:
        {
            type: DataTypes.INTEGER, allowNull:false, autoIncrement: true,
            allowNull: false
        },
        idcargo:
        {
            type: DataTypes.INTEGER, allowNull:false, autoIncrement: true,
            allowNull: false
        },
        idusuario:
        {
            type: DataTypes.INTEGER, allowNull:false, autoIncrement: true,
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