import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../index';
import { Lesson } from './lesson.model';
import { LessonTeacher } from './lesson_teacher.model';
import { LessonStudent } from './lesson_student.model';
import { Student } from './student.model';

interface TeacherAttributes {
  id: number;
  name: string;
}

interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> { }

export class Teacher extends Model<TeacherAttributes, TeacherCreationAttributes>
  implements TeacherAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public declare lessons?: Lesson[];


  public static associate(models: any) {
    LessonStudent.belongsTo(models.Student, { foreignKey: 'studentId' });
  }
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

// Teacher.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   tableName: 'teachers',
//   timestamps: true
// });
// async function associate(model: any) {
//   model.belongsToMany(Lesson, {
//     through: LessonTeacher,
//     foreignKey: 'teacherId',
//     otherKey: 'lessonId',
//     as: 'lessons'
//   });

// }
