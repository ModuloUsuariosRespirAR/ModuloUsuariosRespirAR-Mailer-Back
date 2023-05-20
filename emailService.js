const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function enviarCorreo(destinatario, asunto, contenido) {

    const msg = {
        to: destinatario,
        from: process.env.EMAIL,
        subject: asunto,
        text: contenido
    };

    try {
        await sgMail.send(msg);
        console.log('Correo electrónico enviado');
        return 'Correo electrónico enviado correctamente';
    } catch (error) {
        console.error(error);
        throw new Error('Error al enviar el correo electrónico');
    }
}

module.exports = { enviarCorreo };
