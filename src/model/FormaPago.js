const { DataTypes } = require('sequelize');
const db = require('../config/db');
const FormaPago = db.define(
    'FormaPago',
    {

        formaPago: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },

    },
    {
        tableName: 'Forma_Pago',
    }
);
module.exports = FormaPago;