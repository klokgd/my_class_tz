import { Model, DataTypes } from 'sequelize';
import Teacher from './teacher.model';
import Student from './student.model';
import LessonStudent from './lesson_student.model';
import { sequelize } from '..';


class Lesson extends Model {
  public id!: number;
  public date!: string;
  public title!: string;
  public status!: number;

  public declare teachers?: Teacher[];
  public declare students?: Student[];

  public declare LessonStudent?: LessonStudent[]

  public static associate(models: any): void {
    models.Lesson.belongsToMany(models.Teacher, {
      through: 'lesson_teachers',
      foreignKey: 'lesson_id',
      otherKey: 'teacher_id',
      as: 'teachers'
    });

    models.Lesson.belongsToMany(models.Student, {
      through: 'lesson_students',
      foreignKey: 'lesson_id',
      otherKey: 'student_id',
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'lessons',
  timestamps: false,
});

export = Lesson;