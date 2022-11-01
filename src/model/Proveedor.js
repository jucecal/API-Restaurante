const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Proveedor = db.define(
    'Proveedor',
    {
        proveedor:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        nombre_contacto:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        
        telefono:
        {
            type: DataTypes.STRING(20),
            allowNull: false
        },
      
    },
    {
        tableName: 'proveedores',
    }
);
module.exports = Proveedor;