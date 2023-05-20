# ModuloUsuariosRespirAR-Mailer

ModuloUsuariosRespirAR-Mailer es un proyecto de servidor que utiliza Node.js, Express y Nodemailer para enviar correos electrónicos a los usuarios.

## Características

- Envío de correos electrónicos a través de Nodemailer.
- Uso de variables de entorno para almacenar la configuración del correo electrónico.

## Requisitos

- Node.js (versión 12 o superior)

## Instalación

1. Clona el repositorio: `git clone https://github.com/tu-usuario/ModuloUsuariosRespirAR-Mailer.git`
2. Navega al directorio del proyecto: `cd ModuloUsuariosRespirAR-Mailer`
3. Instala las dependencias: `npm install`

## Configuración

Antes de ejecutar el servidor, asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:
SENDGRID_API_KEY=your_sendgrid_api_key
SENDER_EMAIL=your_sender_email
Reemplaza `your_sendgrid_api_key` con tu clave API de SendGrid y `your_sender_email` con la dirección de correo electrónico desde la cual deseas enviar los mensajes.

## Uso

1. Inicia el servidor: `npm start`
2. Envía una solicitud POST a `http://localhost:3000/send-email` con los siguientes datos en el body:
   {
   "to": "destinatario@example.com",
   "subject": "Asunto del correo",
   "text": "Contenido del correo"
   }

