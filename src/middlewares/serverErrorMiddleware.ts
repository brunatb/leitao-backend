/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enum/HttpStatus.enum';

export default async function serverErrorMiddleware(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	console.error('Error Middleware: ', err);
	return res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
}
