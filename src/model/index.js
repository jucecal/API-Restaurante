const Sucursal = require("./Sucursal");
const Combo = require("./Combo");
const Categoria = require("./Categoria");
const Clientes = require('./Clientes');
const Mesas = require('./Mesas');
const Reservaciones = require('./Reservaciones');
const Compra = require('./Compra');

exports.CrearModelos = () => {

    //primeras relaciones hechas por Rebirth
    Sucursal.hasMany(Mesas);
    Mesas.belongsTo(Sucursal);

    //relacion entre sucursales y compras
    Sucursal.hasMany(Compra);
    Compra.belongsTo(Sucursal);

    //
    Clientes.hasMany(Reservaciones);
    Reservaciones.belongsTo(Clientes);

    //PARA TABLA DE RELACIONES TBL_MESAS_x_RESERVA
    Reservaciones.hasMany(Mesas);
    Mesas.belongsTo(Reservaciones);

    Sucursal.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    Combo.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    Categoria.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    //rebirth
    Clientes.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    Reservaciones.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    Mesas.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    //----modelo de Compra-----
    Compra.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })
}