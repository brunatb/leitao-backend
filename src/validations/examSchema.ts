import joi from 'joi';

const examSchema: joi.ObjectSchema = joi.object({
	name: joi.string().min(1).required(),
	link: joi.string().min(1).required(),
	category: joi.string().valid('P1', 'P2', 'P3', 'REP', 'OTHERS').required(),
	teacherId: joi.number().integer().min(0).required(),
	subjectId: joi.number().integer().min(0).required(),
});

export default examSchema;
