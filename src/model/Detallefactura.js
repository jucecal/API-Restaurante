const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Detallefactura = db.define(
    'Detallefactura',
    {
        cantidad:{ type: DataTypes.INTEGER, allowNull: false},

        subtotal:{ type: DataTypes.DOUBLE, allowNull: false,
            validate:{
                isDecimal: true, min: 1
            }
        },
        
        estado:{ type: DataTypes.ENUM('AC', 'IN', 'BL'), allowNull: false, defaultValue: 'AC'}
    },
    {
        tableName: 'detallefacturas',
    }
);
module.exports = Detallefactura;