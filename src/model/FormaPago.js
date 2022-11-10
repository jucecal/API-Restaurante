const { DataTypes } = require('sequelize');
const db = require('../config/db');
const FormaPago = db.define(
    'FormaPago',
    {
        formaPago: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
    },
    {
        tableName: 'Forma_Pago',
    }
);
module.exports = FormaPago;