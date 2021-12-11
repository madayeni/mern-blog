import Joi from "joi";

const schema = Joi.object({
  password: Joi.string().min(6).required(),
});

export default schema;
