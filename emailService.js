const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = require('./models/msgModel.js');

 async function enviarCorreo(email) {
     try {
         await sgMail.send(email);
         console.log('Correo electrónico enviado');
         return 'Correo electrónico enviado correctamente';
     } catch (error) {
         console.error(error);
         throw new Error('Error al enviar el correo electrónico');
     }
 }

module.exports = { enviarCorreo };
