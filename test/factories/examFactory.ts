import { getRepository } from 'typeorm';
import faker from 'faker';
import { Course } from '../../src/entities/Course';
import { Exam } from '../../src/entities/Exam';
import { Professor } from '../../src/entities/Professor';
import Category from '../../src/enum/Category.enum';
import { createCourse } from './courseFactory';
import { createProfessor } from './professorFactory';

export async function createExam(
	course?: Course,
	professor?: Professor,
	name?: string,
	pdfLink?: string,
	category?: Category,
): Promise<Exam> {
	const exam = getRepository(Exam).create({
		name: name || faker.name.findName(),
		pdfLink: pdfLink || faker.internet.url(),
		category: category || Category.OTHERS,
		course: course || (await createCourse()),
		professor: professor || (await createProfessor([course])),
	});

	await getRepository(Exam).save(exam);

	return exam;
}
