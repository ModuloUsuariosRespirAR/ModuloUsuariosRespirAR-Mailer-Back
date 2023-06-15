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
    const { email } = req.body;
    let result = await KeyrockService.findUserByEmailAndSendEmail(email);
    res.send(result);

  }  static async activateUser(req, res) {
    const { id } = req.body;
    let result = await KeyrockService.findUserByIdAndSendEmail(id);
    res.send(result);

  }

}
