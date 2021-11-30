import Joi from "joi";

const schema = Joi.object({
  user: Joi.string().min(4).required(),
  password: Joi.string().min(6).required(),
});

export default schema;
