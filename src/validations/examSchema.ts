import joi from 'joi';

const examSchema: joi.ObjectSchema = joi.object({
	name: joi.string().trim().min(1).required(),
	pdfLink: joi.string().trim().min(1).required(),
	category: joi.string().valid('P1', 'P2', 'P3', 'REP', 'OTHERS').required(),
	professorId: joi.number().integer().min(0).required(),
	courseId: joi.number().integer().min(0).required(),
});

export default examSchema;
