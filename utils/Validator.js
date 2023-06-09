import Joi from 'joi';

export class Validator {
    static validateEmailFields(data) {
        const schema = Joi.object({
            to: Joi.string().email().required(),
            subject: Joi.string().required(),
            text: Joi.string().required()
        });

        return schema.validate(data);
    }

    static validateMultipleEmails(data) {
        const schema = Joi.object({
            emailsTo: Joi.array()
                .items(Joi.string().email())
                .min(1)
                .required(),
            subject: Joi.string().required(),
            text: Joi.string().required()
        });

        return schema.validate(data);
    }
}
