import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enum/HttpStatus.enum';
import * as courseService from '../services/courseService';

export async function getExamsGroupedByCourse(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const exams = await courseService.getExamsGroupedByCourse();
		return res.status(StatusCode.OK).send(exams);
	} catch (err) {
		next(err);
	}
}
