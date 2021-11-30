import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string(),
});

export default schema;
