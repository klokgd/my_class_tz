import { Model, Sequelize } from 'sequelize';
import config from 'config'
import { Config } from '../config/config.interface';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const { database, username, password, host, port, dialect } = config.get<Config['db']>('db')

const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  port,
  dialect,
  logging: false
});

const models: Record<string, any> = {};

const modelsDir = path.resolve(__dirname, 'models');

(async () => {
  for (const file of fs.readdirSync(modelsDir)) {
    if (file.endsWith('.model.ts') || file.endsWith('.model.js')) {
      const filePath = path.join(modelsDir, file);
      const fileUrl = pathToFileURL(filePath).href;
      const modelModule = (await import(fileUrl)).default;
      const modelName = modelModule.name;

      if (modelName) {
        models[modelName] = modelModule;
      }

    }
  }

  for (const key in models) {
    if (models[key].associate) {
      models[key].associate(models);
    }
  }
})()


export { sequelize, models };