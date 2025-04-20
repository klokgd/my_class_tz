import { Student } from '../DB/models/student.model';
import { Teacher } from '../DB/models/teacher.model';

export interface LessonResponseDto {
  id: number;
  date: string;
  title: string;
  status: number;
  visitCount: number;
  students: {
    id: number;
    name: string;
    visit: boolean;
  }[];
  teachers: {
    id: number;
    name: string;
  }[];
}