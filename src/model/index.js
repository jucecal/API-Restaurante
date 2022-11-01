const Sucursal = require("./Sucursal");
const Combo = require("./Combo");
const Categoria = require("./Categoria");
const Clientes = require('./Clientes');

const Mesas = require('./Mesas');
const Reservaciones = require('./Reservaciones');
const Compra = require('./Compra');
const Menu = require('./Menu');

const Cargo = require('./Cargo');
const PxCombo = require('./PlatoCombo');
const IxSucursal = require('./Inventario');
const PxPlato = require("./ProductoPlato");

const Insumo = require("./Insumo");
const Tipo = require("./Tipo");
const Detallefactura = require("./DetalleFactura");
const Usuario = require("./Usuario");
const Empleado = require("./Empleados");

const Formas_Pago = require("./FormaPago");
const Proveedor = require("./Proveedor");
const Factura = require("./Factura");
const detalleCompra = require("./DetalleCompra");


exports.CrearModelos = () => {

    //CREACION DE LAS RELACIONES PARA LAS TABLAS
    //=========================================
    //primeras relaciones hechas por Rebirth
    Sucursal.hasMany(Mesas);
    Mesas.belongsTo(Sucursal);

    //relacion entre sucursales y compras
    Sucursal.hasMany(Compra);
    Compra.belongsTo(Sucursal);

    //PARA TABLA DE RELACIONES ENTRE CLIENTES Y RESERVACIONES
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

    //RELACIÓN ENTRE TIPO PRODUCTO Y PRODUCTOS COMPRA
    Tipo.hasMany(Insumo)
    Insumo.belongsTo(Tipo)

    //RELACIÓN ENTRE USUARIOS Y CLIENTES
    Usuario.hasMany(Clientes)
    Clientes.belongsTo(Usuario)

    //Relacion entre combos y PxCombo
    Combo.hasMany(PxCombo)
    PxCombo.belongsTo(Combo)

    //Relacion entre menu y PxCombo
    Menu.hasMany(PxCombo)
    PxCombo.belongsTo(Menu)

    //RELACIÓN ENTRE DETALLE COMPRA CON COMPRAS, PRODUCTOS, SUCURSAL
    Compra.hasMany(detalleCompra)
    detalleCompra.belongsTo(Compra)

    Insumo.hasMany(detalleCompra)
    detalleCompra.belongsTo(Insumo)

    Mesas.hasMany(Factura)
    Factura.belongsTo(Mesas)

    Reservaciones.hasMany(Factura)
    Factura.belongsTo(Reservaciones)

    Clientes.hasMany(Factura)
    Factura.belongsTo(Clientes)

    Formas_Pago.hasMany(Factura)
    Factura.belongsTo(Formas_Pago)

    Empleado.hasMany(Factura)
    Factura.belongsTo(Empleado)


    //CREACIÓN DE LOS MODELOS EN LA BASE DE DATOS
    //===========================================
    //--------MODELO SUCURSAL----------------
    Sucursal.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    //--------MODELO EMPLEADO----------------
    Empleado.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    //--------MODELO FORMAS DE PAGO----------------
    Formas_Pago.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    //--------MODELO PROVEEDOR----------------
    Proveedor.sync().then(() => {
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


    //-----------MODELO COMBO-------------
    Combo.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //----------MODELO CATEGORIA--------------
    Categoria.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //----modelo de Menu-----
    Menu.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //------------MODELO PXCOMBO------------
    PxCombo.sync().then(() => {

        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //----------MODELO CLIENTES-------------
    //rebirth
    Clientes.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //-----------MODELO RESERVACIONES-------------
    Reservaciones.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //------------MODELO MESAS------------
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


    //----------MODELO IXSUCURSAL-------------
    IxSucursal.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //-----------MODELO PXPLATO-------------   
    PxPlato.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //-----------MODELO IXCOMPRA-------------
    Insumo.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //-----------MODELO TIPO PRODUCTO-------------
    Tipo.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //-----------MODELO DETALLE FACTURA-------------
    Detallefactura.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //-----------MODELO USUARIO-------------
    Usuario.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    //-----------MODELO DETALLE COMPRA-------------
    detalleCompra.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

    //-----------MODELO FACTURA-------------
    Factura.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })
}