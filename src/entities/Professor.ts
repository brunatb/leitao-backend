import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Course } from './Course';

@Entity('professors')
export class Professor {
	@PrimaryGeneratedColumn({ name: 'professor_id' })
	id: number;

	@Column('text')
	name: string;

	@ManyToMany(() => Course)
	@JoinTable({
		name: 'professors_courses',
		joinColumn: { name: 'professor_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
	})
	courses: Course[];
}
