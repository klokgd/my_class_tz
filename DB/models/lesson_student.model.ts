import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

class LessonStudent extends Model {
  public lessonId!: number;
  public studentId!: number;
  public visit!: boolean;
}

LessonStudent.init({
  lessonId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'lesson_id',
    references: {
      model: 'lessons',
      key: 'id'
    }
  },
  studentId: {
    type: DataTypes.INTEGER,
    field: 'student_id',
    primaryKey: true,
    references: {
      model: 'students',
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


export = LessonStudent;