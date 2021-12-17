import Category from '../enum/Category.enum';

interface ExamDTO {
	name: string;
	pdfLink: string;
	category: Category;
	courseId: number;
	professorId: number;
}
export default ExamDTO;
