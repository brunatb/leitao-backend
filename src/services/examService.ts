import { getRepository, ObjectLiteral } from 'typeorm';
import * as professorService from './professorService';
import * as courseService from './courseService';
import Category from '../enum/Category.enum';
import { Exam } from '../entities/Exam';
import ExamDTO from '../errors/interfaces/ExamDTO';
import ExamError from '../errors/ExamError';

export async function create(exam: ExamDTO): Promise<ObjectLiteral> {
	const categoryExists = exam.category in Category;
	if (!categoryExists) throw new ExamError('Invalid Exam Category.');

	const professor = await professorService.findById(exam.professorId);
	console.log(professor);
	if (!professor)
		throw new ExamError(`Professor with id = ${exam.professorId} does not exist`, 'NOT_FOUND');

	const course = await courseService.findById(exam.courseId);
	console.log(course);
	if (!course) throw new ExamError(`Course with id = ${exam.courseId} does not exist`, 'NOT_FOUND');

	if (professor.courses.includes(course)) {
		throw new ExamError(`Mr/Mrs ${professor.name} does not teach ${course.name}`, 'NOT_FOUND');
	}

	const { name, pdfLink, category } = exam;

	const newExam = await getRepository(Exam)
		.createQueryBuilder()
		.insert()
		.into(Exam)
		.values({ name, pdfLink, category, professor, course })
		.returning('*')
		.execute();

	return newExam.generatedMaps;
}
