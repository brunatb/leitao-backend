import * as professorService from './professorService';
import * as courseService from './courseService';
import Category from '../enum/Category.enum';
import ExamDTO from '../interfaces/ExamDTO';
import ExamError from '../errors/ExamError';

export async function create(exam: ExamDTO) {
	const categoryExists = exam.category in Category;
	if (!categoryExists) throw new ExamError('Invalid Exam Category.');

	const professorExists = await professorService.findById(exam.teacherId);
	if (!professorExists)
		throw new ExamError(`Professor with id = ${exam.teacherId} does not exists`, 'NOT_FOUND');

	const courseExists = await courseService.findById(exam.subjectId);
	if (!courseExists)
		throw new ExamError(`Course with id = ${exam.subjectId} does not exists`, 'NOT_FOUND');

	//await getRepository(Exam).createQueryBuilder().insert().into(Exam).values();
}
