import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  photo: Joi.string().allow(""),
  author: Joi.string().required(),
  tags: Joi.array(),
});

export default schema;
