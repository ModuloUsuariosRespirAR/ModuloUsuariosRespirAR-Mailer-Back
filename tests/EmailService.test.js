import { expect } from 'chai';
import { EmailService } from '../service/EmailService.js';
import { Constants } from '../utils/Constants.js';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import {Msg} from '../models/MsgModel.js';
import {MultipleMsg} from '../models/MultipleMsgModel.js';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

describe('Envío de correo electrónico', () => {
    it('debería enviar un correo electrónico exitosamente', async () => {
        const email = new Msg(process.env.EMAIL, process.env.EMAIL, 'Asunto', 'Contenido');
        const result = await EmailService.sendEmail(email);
        expect(result).to.be.equal(Constants.EMAIL_SENT_SUCCESSFULLY);
    });

    it('debería enviar múltiples correos electrónicos exitosamente', async () => {
        const emails = new MultipleMsg(
            [process.env.EMAIL, process.env.EMAIL],
            process.env.EMAIL,
            'Asunto',
            'Contenido'
        );
        const result = await EmailService.sendMultipleEmail(emails);
        expect(result).to.be.equal(Constants.EMAILS_SENT_SUCCESSFULLY);
    });
});
