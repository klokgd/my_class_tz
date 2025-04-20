import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../index';
import { Lesson } from './lesson.model';
import { LessonStudent } from './lesson_student.model';

interface StudentAttributes {
  id: number;
  name: string;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id'> {}

export class Student extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public declare lessons?: Lesson[];

  public declare LessonStudent: LessonStudent;

  public static associations: {
    lessons: import('sequelize').Association<Student, Lesson>;
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
  timestamps: true
});

Student.belongsToMany(Lesson, {
  through: LessonStudent,
  foreignKey: 'studentId',
  otherKey: 'lessonId',
  as: 'lessons'
});