import Joi  from '@hapi/joi';

const user_reg_schema = Joi.object({
    userName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(2).max(30).required()
});

export { user_reg_schema as userRegSchema };

