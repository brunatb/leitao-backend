import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enum/HttpStatus.enum';
import * as courseService from '../services/courseService';
import ExamError from '../errors/ExamError';

export async function getExamsGroupedByCourse(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const exams = await courseService.getExamsGroupedByCourse();
		return res.status(StatusCode.OK).send(exams);
	} catch (err) {
		if (err instanceof ExamError) {
			console.error(err.message);
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}

export async function getCourses(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const courses = await courseService.getAllCourses();
		return res.status(StatusCode.OK).send(courses);
	} catch (err) {
		if (err instanceof ExamError) {
			console.error(err.message);
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}
