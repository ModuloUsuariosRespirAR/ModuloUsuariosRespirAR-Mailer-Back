const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = require('../models/msgModel.js');
const { CORREO_ENVIADO_EXITOSAMENTE,CORREOS_ENVIADOS_EXITOSAMENTE, ERROR_ENVIAR_CORREO,ERROR_ENVIAR_CORREOS } = require('../utils/constants.js')

 async function enviarCorreo(email) {
     try {
         await sgMail.send(email);
         console.log(CORREO_ENVIADO_EXITOSAMENTE);
         return CORREO_ENVIADO_EXITOSAMENTE;
     } catch (error) {
         console.error(error);
         throw new Error(ERROR_ENVIAR_CORREO);
     }
 }

async function enviarMultipleCorreo(email) {
    try {
        email.emailsTo.forEach(destinatario => enviarCorreo(new msg(destinatario,email.from,email.subject,email.text)));
        return CORREOS_ENVIADOS_EXITOSAMENTE;
    } catch (error) {
        console.error(error);
        throw new Error(ERROR_ENVIAR_CORREOS);
    }
}

module.exports = { enviarCorreo,enviarMultipleCorreo };
