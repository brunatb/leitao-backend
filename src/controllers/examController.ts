import { Request, Response, NextFunction } from 'express';
import testSchema from '../validations/examSchema';

export async function postExam(req: Request, res: Response, next: NextFunction) {
	try {
		const joiValidation = testSchema.validate(req.body);
		return joiValidation;
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
		next(err);
	}
}
