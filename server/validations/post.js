import Joi from "Joi";

const schema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  photo: Joi.string(),
  author: Joi.string().required(),
  tags: Joi.array(),
});

export default schema;
