import { EmailService } from "../service/EmailService.js"
import { Constants} from "../utils/Constants.js";
import {Validator} from "../utils/Validator.js";
import {Msg} from "../models/MsgModel.js";
import {MultipleMsg} from "../models/MultipleMsgModel.js";
import {KeyrockService} from "../service/KeyrockService.js";
export class MailerController {


  static async sendEmail(req, res) {
    const { to, subject, text } = req.body;

    const { error } = Validator.validateEmailFields({ to, subject, text });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const email = new Msg(to,process.env.EMAIL ,subject, text);

    try {
      const result = await EmailService.sendEmail(email);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(Constants.ERROR_SEND_EMAIL);
    }
  }

  static async sendMultipleEmail(req, res) {
    const { emailsTo, subject, text } = req.body;

    const { error } = Validator.validateMultipleEmails({ emailsTo, subject, text });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const emails = new MultipleMsg(emailsTo,process.env.EMAIL ,subject, text);

    try {
      const result = await EmailService.sendMultipleEmail(emails);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(Constants.ERROR_SEND_MULTIPLE_EMAILS);
    }
  }

  static async changePassword(req, res) {

    let result = await KeyrockService.authKeyRock(req.body);
    res.send(result);
    //authKeyRock()

  }

  static async changePassword2(req, res) {
    const { email } = req.body;

    //TODO: Validar formato email si no esta correcto devolver un error

    let result = await KeyrockService.findUserByEmail(email);
    res.send(result);

  }

/*
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
  */
  /*
  static async login(req, res) {
    const { username, password } = req.body;

    const accessToken = await Keyrock.getAccessToken(username, password);
    const authToken = await Keyrock.getApiToken(username, password, accessToken);
    const user = await Keyrock.getUserInfo(accessToken);

    if (accessToken.error || authToken.error) {
      res
        .status(authToken.error.statusCode)
        .json({ error: authToken.error.message,
        statusCode: authToken.error.statusCode });
    } else {
      res.json({
        accessToken,
        "X-Auth-token": authToken,
        user,
      });
    }
  }
  */

}
