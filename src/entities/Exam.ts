import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Category from '../enum/Category.enum';
import { Course } from './Course';
import { Professor } from './Professor';

@Entity('exams')
export class Exam {
	@PrimaryGeneratedColumn({name:'exam_id'})
	id: number;

	@Column('text')
	name: string;

	@Column({ type: 'text', name: 'pdf_link' })
	pdfLink: string;

	@Column({ type: 'enum', enum: Category })
	category: Category;

	@OneToOne(() => Professor, { eager: true })
	@JoinColumn({ name: 'professor_id' })
	professor: Professor;

	@OneToOne(() => Course, { eager: true })
	@JoinColumn({ name: 'course_id' })
	course: Course;
}
