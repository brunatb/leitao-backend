import supertest from 'supertest';

import app, { init } from '../../src/app';
import { getConnection } from 'typeorm';
import { clearDatabase } from '../utils/database';
import { createCourse } from '../factories/courseFactory';
import { createProfessor } from '../factories/professorFactory';
import generateExamBody from '../utils/generateExamBody';
import StatusCode from '../../src/enum/HttpStatus.enum';
import ExamError from '../../src/errors/ExamError';

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

		expect(response.status).toEqual(StatusCode.CREATED);
	});

	it('should return 400 when the body is malformed (name)', async () => {
		const body = await generateExamBody({});
		const response = await agent.post('/exams/create').send({ ...body, name: '       ' });

		expect(response.statusCode).toEqual(StatusCode.BAD_REQUEST);
	});

	it('should return 400 when the body is malformed (pdfLink)', async () => {
		const body = await generateExamBody({});
		const response = await agent.post('/exams/create').send({ ...body, pdfLink: '' });
		expect(response.statusCode).toEqual(StatusCode.BAD_REQUEST);
	});

	it('should return 400 when the body is malformed (courseId)', async () => {
		const body = await generateExamBody({});
		const response = await agent.post('/exams/create').send({ ...body, courseId: -1 });
		expect(response.statusCode).toEqual(StatusCode.BAD_REQUEST);
	});

	it('should return 400 when the body is malformed (professorId)', async () => {
		const body = await generateExamBody({});

		const response = await agent.post('/exams/create').send({ ...body, professorId: -1 });

		expect(response.statusCode).toEqual(StatusCode.BAD_REQUEST);
	});

	it('should return 400 when the body is malformed (category)', async () => {
		const body = await generateExamBody({});
		const response = await agent.post('/exams/create').send({ ...body, category: 'foo' });

		expect(response.statusCode).toEqual(StatusCode.BAD_REQUEST);
	});

	it('should return 404 when the course does not exists', async () => {
		const body = await generateExamBody({});
		const response = await agent
			.post('/exams/create')
			.send({ ...body, courseId: body.courseId + 1 });

		expect(response.statusCode).toEqual(StatusCode.NOT_FOUND);
	});

	it('should return 404 when the professor does not exists', async () => {
		const body = await generateExamBody({});
		const response = await agent
			.post('/exams/create')
			.send({ ...body, professorId: body.professorId + 1 });

		expect(response.statusCode).toEqual(StatusCode.NOT_FOUND);
	});

	it('should return 404 when the professor does not teach the course provided', async () => {
		const courseOne = await createCourse();
		const courseTwo = await createCourse();
		const professor = await createProfessor([courseOne]);
		const body = await generateExamBody({ professorId: professor.id, courseId: courseTwo.id });

		const response = await agent.post('/exams/create').send(body);

		expect(response.statusCode).toEqual(StatusCode.NOT_FOUND);
	});
});
