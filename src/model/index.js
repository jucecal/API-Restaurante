const Sucursal = require("./Sucursal");
const Combo = require("./Combo");
const Categoria = require("./Categoria");


exports.CrearModelos = () => {

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

}