const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(express.json());

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailService = require('./emailService.js');

app.post('/enviar-correo', async (req, res) => {
    const { destinatario, asunto, contenido } = req.body;

    try {
        const resultado = await emailService.enviarCorreo(destinatario, asunto, contenido);
        res.send(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo electrónico');
    }
});

/* version 1
app.post('/enviar-correo', (req, res) => {
    const { destinatario, asunto, contenido } = req.body;

    const msg = {
        to: destinatario,
        from: process.env.EMAIL,
        subject: asunto,
        text: contenido,
        //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Correo electrónico enviado');
            res.send('Correo electrónico enviado correctamente');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error al enviar el correo electrónico');
        });
});
*/

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});


/*
//EXAMPLE OF SENDGRID
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
*/