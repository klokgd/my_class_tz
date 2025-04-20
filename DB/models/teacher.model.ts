import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../index';
import { Lesson } from './lesson.model';
import { LessonTeacher } from './lesson_teacher.model';

interface TeacherAttributes {
  id: number;
  name: string;
}

interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> {}

export class Teacher extends Model<TeacherAttributes, TeacherCreationAttributes>
  implements TeacherAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public declare lessons?: Lesson[];

  public static associations: {
    lessons: import('sequelize').Association<Teacher, Lesson>;
  };
}

Teacher.init({
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
  tableName: 'teachers',
  timestamps: true
});

Teacher.belongsToMany(Lesson, {
  through: LessonTeacher,
  foreignKey: 'teacherId',
  otherKey: 'lessonId',
  as: 'lessons'
});