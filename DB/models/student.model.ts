import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';
import Lesson from './lesson.model';
import LessonStudent  from './lesson_student.model';
class Student extends Model {
  public id!: number;
  public name!: string;

  public declare lessons?: Lesson[];

  public declare LessonStudent: LessonStudent;

  public static associate(models: any): void {
    models.Student.belongsToMany(models.Lesson, {
      through: models.LessonStudent,
      foreignKey: 'student_id',
      otherKey: 'lesson_id',
      as: 'lessons'
    });
  };
}

Student.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'students',
  timestamps: false
});

export = Student