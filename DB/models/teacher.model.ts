import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../index';
import Lesson from './lesson.model';

class Teacher extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public declare lessons?: Lesson[];

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
  timestamps: false
});


export = Teacher;