import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Category from '../enum/Category.enum';
import { Course } from './Course';
import { Professor } from './Professor';

@Entity('exams')
export class ExamEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	link: string;

	@Column()
	category: Category;

	@OneToOne(() => Professor, { eager: true })
	@JoinColumn({ name: 'professor_id' })
	professor: Professor;

	@OneToOne(() => Course, { eager: true })
	@JoinColumn({ name: 'course_id' })
	course: Course;
}
