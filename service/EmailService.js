import sgMail from '@sendgrid/mail';
import {Msg} from '../models/MsgModel.js';
import {Constants} from "../utils/Constants.js";

export class EmailService {
    static async sendEmail(email) {
        try {
            await sgMail.send(email);
            console.log(Constants.EMAIL_SENT_SUCCESSFULLY);
            return Constants.EMAIL_SENT_SUCCESSFULLY;
        } catch (error) {
            console.error(error);
            throw new Error(Constants.ERROR_SEND_EMAIL);
        }
    }

    static async sendMultipleEmail(email) {
        try {
            for (const to of email.emailsTo) {
                await this.sendEmail(new Msg(to, email.from, email.subject, email.text));
            }
            return Constants.EMAILS_SENT_SUCCESSFULLY;
        } catch (error) {
            console.error(error);
            throw new Error(Constants.ERROR_SEND_MULTIPLE_EMAILS);
        }
    }
}
