import { Request, Response, NextFunction } from 'express';
import testSchema from '../validations/examSchema';
import idSchema from '../validations/idSchema';
import ExamError from '../errors/ExamError';
import ExamDTO from '../interfaces/ExamDTO';
import * as examService from '../services/examService';
import StatusCode from '../enum/HttpStatus.enum';

export async function postExam(req: Request, res: Response, next: NextFunction): Promise<Response> {
	try {
		const joiValidation = testSchema.validate(req.body);
		if (joiValidation.error) throw new ExamError(joiValidation.error.message);

		const exam: ExamDTO = req.body;

		const createdExam = await examService.create(exam);

		return res.status(StatusCode.CREATED).send(createdExam);
	} catch (err) {
		if (err instanceof ExamError) {
			console.error(err.message);
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}

export async function getExamsByProfessorId(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const joiValidation = idSchema.validate(req.params); // TO-DO checkar essse number
		if (joiValidation.error) throw new ExamError(joiValidation.error.message);

		const { id } = req.params;

		const examsList = await examService.findAllByProfessorId(Number(id));
		return res.status(StatusCode.OK).send(examsList);
	} catch (err) {
		if (err instanceof ExamError) {
			console.error(err.message);
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}
