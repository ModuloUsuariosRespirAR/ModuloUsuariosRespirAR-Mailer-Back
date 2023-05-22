const Joi = require('joi');

// Validar los campos requeridos
const validateEmailFields = (data) => {
    const schema = Joi.object({
        to: Joi.string().email().required(),
        subject: Joi.string().required(),
        text: Joi.string().required()
    });

    return schema.validate(data);
};

const validateMultipleEmails = (data) => {
    const schema = Joi.object({
        emailsTo : Joi.array()
            .items(Joi.string().email())
            .min(1)
            .required(),
        subject: Joi.string().required(),
        text: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = {
    validateEmailFields,
    validateMultipleEmails
};
