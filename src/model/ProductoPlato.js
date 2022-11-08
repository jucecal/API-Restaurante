const { DataTypes } = require('sequelize');
const db = require('../config/db');
const ProductoPlato = db.define(
    'ProductoPlato',
    {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        }
    },
    {
        tableName: 'Producto_X_Plato',
    }
);
module.exports = ProductoPlato;