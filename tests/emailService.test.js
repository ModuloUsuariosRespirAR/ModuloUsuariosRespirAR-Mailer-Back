const emailService =  require('../service/emailService');
const { CORREO_ENVIADO_EXITOSAMENTE,CORREOS_ENVIADOS_EXITOSAMENTE } = require('../utils/constants.js')
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = require('../models/msgModel.js');
const multipleMsg = require('../models/multipleMsgModel');
test('Envío de correo electrónico exitoso', async() => {
    const email = new msg(process.env.EMAIL ,process.env.EMAIL ,'Asunto', 'Contenido');
    const result = await emailService.enviarCorreo(email);
    expect(result).toBe(CORREO_ENVIADO_EXITOSAMENTE);
});

test('Envío de correo electrónico multiple exitoso', async() => {
    const emails = new multipleMsg([process.env.EMAIL,process.env.EMAIL] ,process.env.EMAIL ,'Asunto', 'Contenido');
    const result = await emailService.enviarMultipleCorreo(emails);
    expect(result).toBe(CORREOS_ENVIADOS_EXITOSAMENTE);
});