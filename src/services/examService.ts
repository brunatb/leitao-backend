import Exam from '../entities/Exam';
import Category from '../enum/Category.enum';
import ExamError from '../errors/ExamError';

import ExamDTO from '../interfaces/ExamDTO';

export async function create(exam: ExamDTO) {
	const categoryExists = exam.category in Category;
	if (!categoryExists) throw new ExamError('Invalid Exam Category.');

	const teacherExists = teacherService.find(exam.teacherId);
	if (!teacherExists)
		throw new ExamError(`Teacher with id = ${exam.teacherId} does not exists`, 'NOT_FOUND');

	const subjectExists = couserService.find(exam.subjectId);
	if (!subjectExists)
		throw new ExamError(`Subject with id = ${exam.subjectId} does not exists`, 'NOT_FOUND');
}
