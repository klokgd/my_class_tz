import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';
import { Lesson } from './lesson.model';
import { Teacher } from './teacher.model';

interface LessonTeacherAttributes {
  lessonId: number;
  teacherId: number;
}

export class LessonTeacher extends Model<LessonTeacherAttributes>
  implements LessonTeacherAttributes {
  public lessonId!: number;
  public teacherId!: number;
}

LessonTeacher.init({
  lessonId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Lesson,
      key: 'id'
    }
  },
  teacherId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Teacher,
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'lesson_teachers',
  timestamps: false
});