const express = require('express');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app = express();
app.use(express.json());
require('dotenv').config();
const emailService = require('./emailService.js');
const msg = require('./models/msgModel.js');
const multipleMsg = require('./models/multipleMsgModel');
const { BASE_URL , ERROR_ENVIAR_CORREO,ERROR_ENVIAR_CORREOS } = require('./utils/constants.js')

app.post(BASE_URL, async (req, res) => {
    const { destinatario, asunto, contenido } = req.body;
    const email = new msg(destinatario,process.env.EMAIL ,asunto, contenido);

    try {
        const resultado = await emailService.enviarCorreo(email);
        res.send(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).send(ERROR_ENVIAR_CORREO);
    }
});

app.post(BASE_URL+'/multiple', async (req, res) => {
    const { destinatario, asunto, contenido } = req.body;
    const emails = new multipleMsg(destinatario,process.env.EMAIL ,asunto, contenido);

    try {
        const resultado = await emailService.enviarMultipleCorreo(emails);
        res.send(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).send(ERROR_ENVIAR_CORREOS);
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
