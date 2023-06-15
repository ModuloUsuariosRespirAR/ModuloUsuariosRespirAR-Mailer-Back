export class Constants {
    static BASE_URL = "/send-email";
    static EMAIL_SENT_SUCCESSFULLY = 'Correo electrónico enviado correctamente';
    static ERROR_SEND_EMAIL = 'Error al enviar el correo electrónico';
    static EMAILS_SENT_SUCCESSFULLY = 'Correos electrónicos enviados correctamente';
    static ERROR_SEND_MULTIPLE_EMAILS = 'Error al enviar los correos electrónicos';
    static SUBJECT_CHANGE_PASSWORD = 'Cambio de contraseña - Solicitud de restablecimiento';
    static TEXT_CHANGE_PASSWORD = `Hola,\n\nHas solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para cambiar tu contraseña:\n\n[URL_DE_REDIRECCIÓN]\n\nSi no solicitaste este cambio, puedes ignorar este correo electrónico.\n\n¡Gracias!`;
    static EMAIL_NOT_FOUND= "No se pudo encontrar el correo electrónico x en la base de datos Keyrock";
    static TEST_URL = "https://www.google.com/";
    static USER_ALREADY_ACTIVE = "Su usuario ya esta activo"
    static USER_ACTIVE = "Su usuario fue activado exitosamente!"
    static SUBJECT_ACTIVE_USER = "¡Activa tu cuenta!";
    static USER_DONT_FOUND = "El Usuario no fue encontrado en la base de datos de Keyrock";

    static GENERATE_EMAIL_NOT_FOUND(email) {
        return `No se pudo encontrar el correo electrónico ${email} en la base de datos Keyrock`;
    }

    static GENERATE_TEXT_CHANGE_PASSWORD(urlRedirection) {
        return `Hola,\n\nHas solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para cambiar tu contraseña:\n\n${urlRedirection}\n\nSi no solicitaste este cambio, puedes ignorar este correo electrónico.\n\n¡Gracias!`;
    }

    static GENERATE_TEXT_ACTIVE_USER(urlRedirection) {
        return `Hola,\n\nGracias por registrarte en nuestro sitio web. Para activar tu cuenta, por favor haz clic en el siguiente enlace:\n\n${urlRedirection}\n\nSi no puedes hacer clic en el enlace, cópialo y pégalo en la barra de direcciones de tu navegador.\n\n¡Esperamos verte pronto en nuestro sitio!\n\nSaludos,\nEl equipo de Ciudades del Futuro!`;
    }

}
