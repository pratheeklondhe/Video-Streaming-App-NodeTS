import Joi  from '@hapi/joi';

const user_reg_schema = Joi.object({
    userName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(2).max(30).required()
});

const user_login_schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required()
});

export { user_reg_schema as userRegSchema, user_login_schema as userLoginSchema };

