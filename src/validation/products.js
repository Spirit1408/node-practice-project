import Joi from "joi";

export const createProductSchema = Joi.object({
	name: Joi.string().required(),
	price: Joi.number().required(),
	category: Joi.string()
		.required()
		.valid("electronics", "clothing", "books", "other"),
	description: Joi.string(),
});

export const updateProductSchema = Joi.object({
	name: Joi.string(),
	price: Joi.number(),
	category: Joi.string().valid("electronics", "clothing", "books", "other"),
	description: Joi.string(),
});
