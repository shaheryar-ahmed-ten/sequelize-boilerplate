const Joi = require('joi');

const AddValidation = Joi.object({
    userId: Joi.number().required(),
    comments: Joi.string().required(),
})

const UpdateValidation = Joi.object({
    userId: Joi.number().optional(),
    comments: Joi.string().optional(),
})


module.exports = {
    AddValidation,
    UpdateValidation
}