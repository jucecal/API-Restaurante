const { DataTypes} = require('sequelize');
const db = require('../config/db');

const Menu = db.define(
    'Menu',
    {        
        nombre: 
        {
            type: DataTypes.STRING(50), 
            allowNull: false,
            unique: {arg: true, msg: 'No se permiten nombres de producto duplicados'},
            validate:{
                    len:[3,50],
                    notEmpty: true
            }          
        },
        precio:
        {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate:{
                isDecimal: true, 
                min: 1     
            }
        },
        descripcion:
        {
            type: DataTypes.STRING(250), 
            allowNull: false,            
            validate:{
                    len:[3,250],
                    notEmpty: true
            } 
        }            
        
    },
    {
        tableName: 'menu'
    }
);
module.exports = Menu;


