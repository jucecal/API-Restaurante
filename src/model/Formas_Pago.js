const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Formas_Pago = db.define(
    'Formas_Pago',
    {

        forma_Pago:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        
    },
    {
        tableName: 'formas_pagos',
    }
);
module.exports = Formas_Pago;