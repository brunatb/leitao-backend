import statusCode from '../enum/HttpStatus.enum';

class ExamError extends Error {
	statusCode: number;

	constructor(m: string, httpStatus?: string) {
		super(m);
		Object.setPrototypeOf(this, ExamError.prototype);
		this.name = 'ExamError';
		this.statusCode = statusCode[httpStatus as keyof typeof statusCode] || 400;
	}
}

export default ExamError;
