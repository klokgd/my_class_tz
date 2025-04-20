import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { Teacher } from './teacher.model';
import { Student } from './student.model';
import { LessonStudent } from './lesson_student.model';
import { sequelize } from '..';

interface LessonAttributes {
  id: number;
  date: Date;
  title: string;
  status: number;
}

interface LessonCreationAttributes extends Optional<LessonAttributes, 'id'> { }

export class Lesson extends Model<LessonAttributes, LessonCreationAttributes>
  implements LessonAttributes {
  public id!: number;
  public date!: Date;
  public title!: string;
  public status!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public declare teachers?: Teacher[];
  public declare students?: Student[];

  public declare LessonStudent?: LessonStudent[]
  public static associate(models: any): void {
    this.belongsToMany(models.Teacher, {
      through: 'LessonTeachers',
      foreignKey: 'lessonId',
      as: 'teachers'
    });

    this.belongsToMany(models.Student, {
      through: 'LessonStudents',
      foreignKey: 'lessonId',
      as: 'students'
    });
  }
}

Lesson.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: DataTypes.DATEONLY,
  title: DataTypes.STRING,
  status: DataTypes.INTEGER
}, {
  sequelize,
  tableName: 'lessons'
})