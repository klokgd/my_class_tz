import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';
import { Lesson } from './lesson.model';
import { Student } from './student.model';

interface LessonStudentAttributes {
  lessonId: number;
  studentId: number;
  visit: boolean;
}

export class LessonStudent extends Model<LessonStudentAttributes>
  implements LessonStudentAttributes {
  public lessonId!: number;
  public studentId!: number;
  public visit!: boolean;
}

LessonStudent.init({
  lessonId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Lesson,
      key: 'id'
    }
  },
  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Student,
      key: 'id'
    }
  },
  visit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  tableName: 'lesson_students',
  timestamps: false
});