import { Sequelize } from 'sequelize';
import config from 'config'
import { Config } from '../config/config.interface';
const dbConfig = config.get<Config['db']>('db')

const sequelize = new Sequelize({
  ...dbConfig,
  logging: false
});

export { sequelize };