import supertest from 'supertest';

import app, { init } from '../../src/app';
import { getConnection } from 'typeorm';
import { clearDatabase } from '../utils/database';
import { createCourse } from '../factories/courseFactory';
import { createProfessor } from '../factories/professorFactory';
import generateExamBody from '../utils/generateExamBody';
import StatusCode from '../../src/enum/HttpStatus.enum';

const agent = supertest(app);

afterAll(async () => {
	await getConnection().close();
});

beforeAll(async () => {
	await init();
});

beforeEach(async () => {
	await clearDatabase();
});

describe('POST /exams/create', () => {
	it('should return 400 when the body is malformed (courseId)', async () => {
		const body = generateExamBody({ courseId: -1 });
		const response = agent.post('/exams/create').send(body);

		response.catch((err) => {
			expect(err.name).toEqual('ExamError');
			expect(err.statusCode).toBe(StatusCode.BAD_REQUEST);
		});
	});
	it('should return 400 when the body is malformed (professorId)', async () => {
		const course = await createCourse();
		const body = generateExamBody({ courseId: course.id, professorId: -1 });
		const response = agent.post('/exams/create').send(body);

		response.catch((err) => {
			expect(err.name).toEqual('ExamError');
			expect(err.statusCode).toBe(StatusCode.BAD_REQUEST);
		});
	});

	it('should answer with an object containing exam info and status 201', async () => {
		const course = await createCourse();
		const professor = await createProfessor([course]);
		const body = await generateExamBody({ courseId: course.id, professorId: professor.id });
		const response = await agent.post('/exams/create').send(body);

		expect(response.body).toEqual({
			name: body.name,
			pdfLink: body.pdfLink,
			category: body.category,
			professor: professor,
			course: course,
			id: expect.any(Number),
		});

		expect(response.status).toBe(StatusCode.CREATED);
	});

	it('should return 400 when the body is malformed (name)', async () => {
		const body = generateExamBody({ name: '     ' });
		const response = agent.post('/exams/create').send(body);

		response.catch((err) => {
			expect(err.name).toEqual('ExamError');
			expect(err.statusCode).toBe(StatusCode.BAD_REQUEST);
		});
	});

	it('should return 400 when the body is malformed (pdfLink)', async () => {
		const body = generateExamBody({ pdfLink: '' });
		const response = agent.post('/exams/create').send(body);

		response.catch((err) => {
			expect(err.name).toEqual('ExamError');
			expect(err.statusCode).toBe(StatusCode.BAD_REQUEST);
		});
	});
});
