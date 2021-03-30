const Joi = require('joi');

const RegisterValidation = Joi.object({
    fullName: Joi.string().required().min(4),
    mobile: Joi.string().optional(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    role_id: Joi.number().required()
})

const updateValidation = Joi.object({
    fullName: Joi.string().optional().min(4),
    mobile: Joi.string().optional(),
    password: Joi.string().min(6).optional(),
    email: Joi.string().email().optional(),
    role_id: Joi.number().optional()
})

const LoginValidation = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email()
})

const ForgetValidation = Joi.object({
    email: Joi.string().email().required()
})

const ResetValidation = Joi.object({
    password: Joi.string().min(6).required(),
    resetToken: Joi.string().required()
})

module.exports = {
    RegisterValidation,
    LoginValidation,
    ForgetValidation,
    ResetValidation,
    updateValidation
}