const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Formas_Pago = db.define(
    'formas_Pago',
    {
        id_Formas_Pago:
        {

            type: DataTypes.INTEGER,primaryKey:true, allowNull:false, autoIncrement: true,
            allowNull: false
        },

        Formas_Pago:
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