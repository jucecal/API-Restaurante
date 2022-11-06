const nodemailer = require('nodemailer');
exports.EnviarCorreo = async (data) =>{
    const configurarCorreo = {
        from: process.env.APP_CORREO,
        to: data.correo,
        subject: 'Recuperación de contraseña Restaurante Come Rico',
        text: 'Pin temporal: ' + data.pin,
    };
    const transporte = nodemailer.createTransport({
        host: process.env.CORREO_SERVICIO,
        port: process.env.CORREO_PORT,
        secure: true,
        auth:{
            user: process.env.APP_CORREO,
            pass: process.env.CORREO_CONTRASENA,
        },
    });
    transporte.verify(function(error, success){
        if(error){
            console.log(error);
            return false;
        }
        else{
            console.log('El servidor puede enviar correos');
        }
    });
    await transporte.sendMail(configurarCorreo)
    .then((data)=>{
        //console.log(data);
    })
    .catch((er)=>{
        console.log(er);
        return false;
    });
    return true;
};

/*https://es-us.ayuda.yahoo.com/kb/account/Genera-y-administra-contraseñas-de-aplicaciones-de-externas-sln15241.html

.correo_servicio = smtp.mail.yahoo.com
.correo_port =  465

*/