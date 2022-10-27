const Sucursal = require("./Sucursal");
const Combo = require("./Combo");
const Categoria = require("./Categoria");
const Clientes = require('./Clientes');
const Mesas = require('./Mesas');
const Reservaciones = require('./Reservaciones');
<<<<<<< Updated upstream
const Compra = require('./Compra');
const Menu = require('./Menu');
const Cargo = require('./Cargo');
=======
const PxCombo = require('./PxCombo');
>>>>>>> Stashed changes
const IxSucursal = require('./IxSucursal');
const PxPlato = require("./PxPlato");
const IxCompra = require("./IxCompra");

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

    //relacion entre menu y categorias
    Categoria.hasMany(Menu);
    Menu.belongsTo(Categoria);   

    //relacion entre combo y productos por combp

    Combo.hasMany(PxCombo);
    PxCombo.belongsTo(Combo);

    // relacion entre sucursal y inventario por sucursal
    Sucursal.hasMany(IxSucursal);
    IxSucursal.belongsTo(Sucursal);



    Sucursal.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    //----modelo de Cargos-----
    Cargo.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })
    //------------------------

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

<<<<<<< Updated upstream
    //----modelo de Menu-----
    Menu.sync().then(() => {
=======
    PxCombo.sync().then(() => {
>>>>>>> Stashed changes
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })
<<<<<<< Updated upstream
    //-----------------------
=======
>>>>>>> Stashed changes

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
    //-----------------------
    IxSucursal.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })
    
    

     PxPlato.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })
    

     IxCompra.sync().then(() => {
         console.log('Modelo creado correctamente');
    })
        .catch((error) => {
             console.log('Error al crear el modelo');
             console.log(error);
        })
        
}