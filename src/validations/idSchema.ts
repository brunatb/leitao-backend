import joi from 'joi';

const idSchema: joi.ObjectSchema = joi.object({
	id: joi.number().integer().required(),
});

export default idSchema;
