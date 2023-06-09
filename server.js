const express = require('express');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app = express();
app.use(express.json());
require('dotenv').config();
const Joi = require('joi');
const emailService = require('./service/emailService.js');
const keyRockService = require('./service/KeyrockService.js');
const { validateEmailFields,validateMultipleEmails } = require('./utils/Validator.js');
const msg = require('./models/MsgModel.js');
const multipleMsg = require('./models/MultipleMsgModel.js');
const { BASE_URL , ERROR_ENVIAR_CORREO,ERROR_ENVIAR_CORREOS } = require('./utils/Constants.js')

app.post(BASE_URL, async (req, res) => {
    const { to, subject, text } = req.body;

    // Validar los campos de correo electrónico
    const { error } = validateEmailFields({ to, subject, text });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const email = new msg(to,process.env.EMAIL ,subject, text);

    try {
        const result = await emailService.enviarCorreo(email);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(ERROR_ENVIAR_CORREO);
    }
});

app.post(BASE_URL+'/multiple', async (req, res) => {
    const { emailsTo, subject, text } = req.body;

    // Validar los campos de los correos electrónicos
    const { error } = validateMultipleEmails({ emailsTo, subject, text });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const emails = new multipleMsg(emailsTo,process.env.EMAIL ,subject, text);

    try {
        const result = await emailService.enviarMultipleCorreo(emails);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(ERROR_ENVIAR_CORREOS);
    }
});

app.put(BASE_URL+'/keyrock/change-password', async (req, res) => {

    let result = await keyRockService.authKeyRock(req.body);
    res.send(result);
    //authKeyRock()

});

app.post(BASE_URL+'/change-password', async (req, res) => {
    let result = await keyRockService.buscarUsuarioPorEmail();
    res.send(result);
});


app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado en el puerto ',process.env.PORT);
});
