import faker from 'faker';
import Category from '../../src/enum/Category.enum';
import ExamTestDTO from './protocols/ExamTestDTO';
import { createCourse } from '../factories/courseFactory';
import { createProfessor } from '../factories/professorFactory';

export default async function generateExamBody(examDTO: ExamTestDTO) {
	const { name, pdfLink, category } = examDTO;
	let { courseId, professorId } = examDTO;

	if (!courseId) {
		const course = await createCourse();

		courseId = course.id;

		professorId = (await createProfessor([course])).id;
	}

	return {
		name: name || faker.name.findName(),
		pdfLink: pdfLink || faker.internet.url(),
		category: category || Category.OTHERS,
		courseId,
		professorId,
	};
}
