import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import Category from '../enum/Category.enum';
import { Course } from './Course';
import { Professor } from './Professor';

@Entity('exams')
export class Exam {
	@PrimaryGeneratedColumn({ name: 'exam_id' })
	id: number;

	@Column('text')
	name: string;

	@Column({ type: 'text', name: 'pdf_link' })
	pdfLink: string;

	@Column({ type: 'enum', enum: Category })
	category: Category;

	@ManyToOne(() => Professor, (professor) => professor.exams, { eager: true })
	@JoinColumn({ name: 'professor_id' })
	professor: Professor;

	@ManyToOne(() => Course, (course) => course.exams, { eager: true })
	@JoinColumn({ name: 'course_id' })
	course: Course;
}
