import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import Category from '../enum/Category';

@Entity('exams')
export default class Exam {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	link: string;

	@Column()
	category: Category;
}
