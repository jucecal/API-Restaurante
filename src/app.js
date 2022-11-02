const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const db = require('./config/db');
const Modelos = require('./model');
const app = express();

app.set('port', 3001);
//app.use(morgan("dev"));
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/', require('./route'));

//AQUÍ IRAN LAS RUTAS DE 4 EN 4 PARA QUE SE VEA UN POCO ORDENADO
app.use('/api/sucursales', require('./route/Sucursal'));
app.use('/api/combos', require('./route/Combo'));
app.use('/api/categorias', require('./route/Categoria'));
app.use('/api/clientes', require('./route/Clientes'));

app.use('/api/mesas', require('./route/Mesas'));
app.use('/api/reservaciones', require('./route/Reservaciones'));
app.use('/api/compras', require('./route/Compra'));
app.use('/api/pxcombo', require('./route/PlatoCombo'));

app.use('/api/tipos', require('./route/Tipo'));
app.use('/api/detallefacturas', require('./route/DetalleFactura'));
app.use('/api/usuarios', require('./route/Usuario'));
app.use('/api/cargos', require('./route/Cargo'));

app.use('/api/menu', require('./route/Menu'));
app.use('/api/inventario', require('./route/Inventario'));
app.use('/api/insumos', require('./route/Insumo'));
app.use('/api/detallecompra', require('./route/DetalleCompra'));

app.use('/api/facturas', require('./route/Factura'));
app.use('/api/proveedor', require('./route/Proveedor'));
app.use('/api/formaspago', require('./route/FormaPago'));
app.use('/api/empleados', require('./route/Empleados'));

//RUTA IMAGENES
app.use('/api/imagenes/', express.static(path.join(__dirname, 'public/img')));

//INICIANDO SERVER
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
    db.authenticate().then(() => {
        console.log('Conexión establecida');
        Modelos.CrearModelos();
    })
        .catch((error) => {
            console.log('Error al conectar');
            console.log(error);
        })
});