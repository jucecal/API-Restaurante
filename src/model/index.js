const Sucursal = require("./Sucursal");


exports.CrearModelos = () => {
    Sucursal.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

}