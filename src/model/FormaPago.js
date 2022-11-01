const { DataTypes } = require('sequelize');
const db = require('../config/db');
const FormaPago = db.define(
    'FormaPago',
    {

        forma_Pago:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        
    },
    {
        tableName: 'Forma_Pago',
    }
);
module.exports = FormaPago;