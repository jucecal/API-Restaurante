const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const Usuario = db.define(
    'Usuario',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                arg: true, 
                msg: 'El usuario ya se encuentra asignado'
            },
            validate: {
                len: [3, 50],
            },
        },

        correo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                arg: true, 
                msg: 'El correo ya se encuentra asignado'
            },
            validate: {
                len: [3, 50],
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        tipo: {
            type: DataTypes.ENUM('CLI', 'EMP'),
            allowNull: false,
            defaultValue: 'CLI',
            validate: {
                isIn: [['CLI', 'EMP']]
            }
        },

        codigo: { 
            type: DataTypes.STRING(10), 
            allowNull: true, 
            defaultValue: '0000' 
        },

        fallido: { 
            type: DataTypes.INTEGER, 
            allowNull: true, 
            defaultValue: 0 
        },

        estado: { 
            type: DataTypes.ENUM('AC', 'IN', 'BL'), 
            allowNull: true, 
            validate: {
                isIn: [['AC', 'IN', 'BL']]
            },
            defaultValue: 'AC' 
        },
    },
    {
        tableName: 'Usuarios',
        hooks: {
            beforeCreate(usuario) {
                const hash = bcrypt.hashSync(usuario.password, 10);
                usuario.password = hash;
            },
            beforeUpdate(usuario) {
                if (usuario.password) {
                    const hash = bcrypt.hashSync(usuario.password, 10);
                    usuario.password = hash;
                }
                if(usuario.fallido>=5)
                    usuario.estado='BL';
            },
        }
    }
);

Usuario.prototype.VerificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
};

module.exports = Usuario;