const Sucursal = require("./Sucursal");
const Combo = require("./Combo");
const Categoria = require("./Categoria");
const Clientes = require('./Clientes');
const Mesas = require('./Mesas');
const Reservaciones = require('./Reservaciones');

exports.CrearModelos = () => {

    //primeras relaciones hechas por Rebirth
    Clientes.hasMany(Reservaciones);
    Reservaciones.belongsTo(Clientes);

    Sucursal.hasMany(Mesas);
    Mesas.belongsTo(Sucursal);

    Sucursal.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

    Combo.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

    Categoria.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

    //rebirth
    Clientes.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

    Reservaciones.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

    Mesas.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

}