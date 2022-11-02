const { DataTypes } = require('sequelize');
const db = require('../config/db');
const ProductoPlato = db.define(
    'ProductoPlato',
    {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'Producto_X_Plato',
    }
);
module.exports = ProductoPlato;