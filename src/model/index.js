const Sucursal = require("./Sucursal");
const Combo = require("./Combo");
const Categoria = require("./Categoria");
const Clientes = require('./Clientes');

const Mesas = require('./Mesas');
const Reservaciones = require('./Reservaciones');
const Compra = require('./Compra');
const Menu = require('./Menu');

const Cargo = require('./Cargo');
const Insumo = require("./Insumo");
const Tipo = require("./Tipo");
const DetalleFactura = require("./DetalleFactura");

const Usuario = require("./Usuario");
const Empleado = require("./Empleados");
const FormaPago = require("./FormaPago");
const Proveedor = require("./Proveedor");

const Factura = require("./Factura");
const DetalleCompra = require("./DetalleCompra");
const Inventario = require("./Inventario");
const ProductoPlato = require("./ProductoPlato");

const PlatoCombo = require("./PlatoCombo");


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
    Mesas.hasMany(Reservaciones);
    Reservaciones.belongsTo(Mesas);

    //relacion entre menu y categorias
    Categoria.hasMany(Menu);
    Menu.belongsTo(Categoria);

    //relacion entre combo y productos por combp

    Combo.hasMany(PlatoCombo);
    PlatoCombo.belongsTo(Combo);

    // relacion entre sucursal y inventario por sucursal
    Sucursal.hasMany(Inventario);
    Inventario.belongsTo(Sucursal);

    //RELACIÓN ENTRE TIPO PRODUCTO Y PRODUCTOS COMPRA
    Tipo.hasMany(Insumo)
    Insumo.belongsTo(Tipo)

    //RELACIÓN ENTRE USUARIOS Y CLIENTES
    Usuario.hasMany(Clientes)
    Clientes.belongsTo(Usuario)

    //Relacion entre combos y PxCombo
    Combo.hasMany(PlatoCombo)
    PlatoCombo.belongsTo(Combo)

    //Relacion entre menu y PxCombo
    Menu.hasMany(PlatoCombo)
    PlatoCombo.belongsTo(Menu)

    //RELACIÓN ENTRE DETALLE COMPRA CON COMPRAS, PRODUCTOS, SUCURSAL
    Compra.hasMany(DetalleCompra)
    DetalleCompra.belongsTo(Compra)

    Insumo.hasMany(DetalleCompra)
    DetalleCompra.belongsTo(Insumo)

    Mesas.hasMany(Factura)
    Factura.belongsTo(Mesas)

    Reservaciones.hasMany(Factura)
    Factura.belongsTo(Reservaciones)

    Clientes.hasMany(Factura)
    Factura.belongsTo(Clientes)

    FormaPago.hasMany(Factura)
    Factura.belongsTo(FormaPago)

    Empleado.hasMany(Factura)
    Factura.belongsTo(Empleado)


    //===========================
    DetalleFactura.hasMany(Factura)
    Factura.belongsTo(DetalleFactura)

    DetalleFactura.hasMany(Combo)
    Combo.belongsTo(DetalleFactura)

    DetalleFactura.hasMany(Menu)
    Menu.belongsTo(DetalleFactura)

//===========================
    Empleado.hasMany(Sucursal)
    Sucursal.belongsTo(Empleado)

    Empleado.hasMany(Usuario)
    Usuario.belongsTo(Empleado)

    Empleado.hasMany(Cargo)
    Cargo.belongsTo(Empleado)


//===========================
    Insumo.hasMany(Proveedor)
    Proveedor.belongsTo(Insumo)


    //===========================
    Inventario.hasMany(Insumo)
    Insumo.belongsTo(Inventario)


    //===========================
    ProductoPlato.hasMany(Insumo)
    Insumo.belongsTo(ProductoPlato)


    //===========================
    Mesas.hasMany(Reservaciones)
    Reservaciones.belongsTo(Mesas)




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
    FormaPago.sync().then(() => {
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
    PlatoCombo.sync().then(() => {

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
    Inventario.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //-----------MODELO PXPLATO-------------   
    ProductoPlato.sync().then(() => {
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
    DetalleFactura.sync().then(() => {
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
    DetalleCompra.sync().then(() => {
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