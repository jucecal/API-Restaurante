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
//const { INET } = require("sequelize");

exports.CrearModelos = () => {

    //CREACION DE LAS RELACIONES PARA LAS TABLAS
    //=========================================

    //relacion entre menu y categorias
    Categoria.hasMany(Menu);
    Menu.belongsTo(Categoria);

    //relacion entre combo y productos por combp
    Combo.hasMany(PlatoCombo);
    PlatoCombo.belongsTo(Combo);

    //Relacion entre menu y PxCombo
    Menu.hasMany(PlatoCombo)
    PlatoCombo.belongsTo(Menu)

    //RELACION ENTRE MENU Y PRODUCTO PLATO
    Menu.hasMany(ProductoPlato)
    ProductoPlato.belongsTo(Menu)

    //RELACION ENTRE INSUMO Y PRODUCTO PLATO
    Insumo.hasMany(ProductoPlato)
    ProductoPlato.belongsTo(Insumo)

    //RELACIÓN ENTRE USUARIOS Y CLIENTES
    Usuario.hasMany(Clientes)
    Clientes.belongsTo(Usuario)

    //RELACION ENTRE SUCURSAL Y MESAS
    Sucursal.hasMany(Mesas);
    Mesas.belongsTo(Sucursal);

    //PARA TABLA DE RELACIONES ENTRE CLIENTES Y RESERVACIONES
    Clientes.hasMany(Reservaciones);
    Reservaciones.belongsTo(Clientes);

    //PARA TABLA DE RELACIONES TBL_MESAS_x_RESERVA
    Mesas.hasMany(Reservaciones);
    Reservaciones.belongsTo(Mesas);


    //RELACION ENTRE SUCURSAL Y EMPLEADO
    Sucursal.hasMany(Empleado)
    Empleado.belongsTo(Sucursal)


    //RELACIÓN TABLA SUCURSAL Y RESERVACIONES
    Sucursal.hasMany(Reservaciones)
    Reservaciones.belongsTo(Sucursal)


    //RELACION ENTRE CARGO Y EMPLEADO
    Cargo.hasMany(Empleado)
    Empleado.belongsTo(Cargo)


    //RELACION ENTRE USUARIO Y EMPLEADO
    Usuario.hasMany(Empleado)
    Empleado.belongsTo(Usuario)


    // relacion entre sucursal y inventario por sucursal
    Sucursal.hasMany(Inventario);
    Inventario.belongsTo(Sucursal);

    //RELACION DE TIPO CON INVENTARIO
    Insumo.hasMany(Inventario)
    Inventario.belongsTo(Insumo)

    //RELACIÓN ENTRE TIPO PRODUCTO Y PRODUCTOS COMPRA
    Tipo.hasMany(Insumo)
    Insumo.belongsTo(Tipo)

    //RELACION DE PROVEEDOR CON INSUMOS
    Proveedor.hasMany(Insumo)
    Insumo.belongsTo(Proveedor)

    //relacion entre sucursales y Detalle compras
    Sucursal.hasMany(Compra);
    Compra.belongsTo(Sucursal);

    //RELACION DE INSUMOS CON DETALLE COMPRA
    Insumo.hasMany(DetalleCompra)
    DetalleCompra.belongsTo(Insumo)

    //RELACIÓN ENTRE DETALLE COMPRA CON COMPRAS, PRODUCTOS, SUCURSAL
    Compra.hasMany(DetalleCompra)
    DetalleCompra.belongsTo(Compra)

    //RELACION DE MESAS CON FACTURAS
    Mesas.hasMany(Factura)
    Factura.belongsTo(Mesas)

    //RELACION DE RESERVACIONES CON FACTURAS
    Reservaciones.hasMany(Factura)
    Factura.belongsTo(Reservaciones)

    //RELACION DE CLIENTES CON FACTURAS
    Clientes.hasMany(Factura)
    Factura.belongsTo(Clientes)

    //RELACION DE FORMA DE PAGO CON FACTURAS
    FormaPago.hasMany(Factura)
    Factura.belongsTo(FormaPago)

    //RELACION DE EMPLEADO CON FACTURAS
    Empleado.hasMany(Factura)
    Factura.belongsTo(Empleado)

    //RELACION DE COMBO CON DETALLE DE FACTURA
    Combo.hasMany(DetalleFactura)
    DetalleFactura.belongsTo(Combo)

    //RELACION DE FACTURA CON DETALLE DE FACTURA
    Factura.hasMany(DetalleFactura)
    DetalleFactura.belongsTo(Factura)

    //RELACION DE SUCURSAL EN FACTURA
    Sucursal.hasMany(Factura)
    Factura.belongsTo(Sucursal)

    //RELACION DE MENU CON DETALLE DE FACTURA
    Menu.hasMany(DetalleFactura)
    DetalleFactura.belongsTo(Menu)


    //######################################################
    //======================================================
    //CREACIÓN DE LOS MODELOS EN LA BASE DE DATOS
    //===========================================
    //-----------MODELO USUARIO-------------
    Usuario.sync().then(() => {
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


    //--------MODELO PROVEEDOR----------------
    Proveedor.sync().then(() => {
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


    //-----------MODELO COMBO-------------
    Combo.sync().then(() => {
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


    //------------MODELO PLATO COMBO------------
    PlatoCombo.sync().then(() => {

        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })


    //-----------MODELO PRODUCTO PLATO-------------   
    ProductoPlato.sync().then(() => {
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


    //--------MODELO SUCURSAL----------------
    Sucursal.sync().then(() => {
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


    //------------MODELO MESAS------------
    Mesas.sync().then(() => {
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



    //----------MODELO IXSUCURSAL-------------
    Inventario.sync().then(() => {
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


    //----Modelo de Compra-----
    Compra.sync().then(() => {
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


    //-----------MODELO DETALLE FACTURA-------------
    DetalleFactura.sync().then(() => {
        console.log('Modelo creado correctamente');
    })
        .catch((error) => {
            console.log('Error al crear el modelo');
            console.log(error);
        })

}