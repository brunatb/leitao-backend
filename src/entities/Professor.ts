import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Course } from './Course';
import { Exam } from './Exam';

@Entity('professors')
export class Professor {
	@PrimaryGeneratedColumn({ name: 'professor_id' })
	id: number;

	@Column('text')
	name: string;

	@ManyToMany(() => Course, course => course.id, { eager: true })
	@JoinTable({
		name: 'professors_courses',
		joinColumn: { name: 'professor_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
	})
	courses: Course[];

	@OneToMany(() => Exam, exam => exam.professor)
	exams: Exam[];
}
