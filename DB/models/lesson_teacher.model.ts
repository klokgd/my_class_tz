import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

class LessonTeacher extends Model {
  public lessonId!: number;
  public teacherId!: number;

}

LessonTeacher.init({
  lessonId: {
    type: DataTypes.INTEGER,
    field: 'lesson_id',
    primaryKey: true,
    references: {
      model: 'lessons',
      key: 'id'
    }
  },
  teacherId: {
    type: DataTypes.INTEGER,
    field: 'teacher_id',
    primaryKey: true,
    references: {
      model: 'teachers',
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'lesson_teachers',
  timestamps: false
});

export = LessonTeacher;