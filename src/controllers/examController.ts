import { Request, Response, NextFunction } from 'express';
import testSchema from '../validations/examSchema';
import ExamError from '../errors/ExamError';
import ExamDTO from '../interfaces/ExamDTO';
import * as examService from '../services/examService';

export async function postExam(req: Request, res: Response, next: NextFunction): Promise<Response> {
	try {
		const joiValidation = testSchema.validate(req.body);
		if (joiValidation.error) throw new ExamError(joiValidation.error.message);

		const exam: ExamDTO = req.body;

		const createdExam = examService.create(exam);
	} catch (err) {
		if (err instanceof ExamError) {
			console.error(err.message);
			return res.status(err.statusCode).send(err.message);
		}
		console.error(err);
		res.sendStatus(500);
		next(err);
	}
}
