import { Model, Sequelize } from 'sequelize';
import config from 'config'
import { Config } from '../config/config.interface';
import fs from 'fs';
import path from 'path';

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

for (const file of fs.readdirSync(modelsDir)) {
  if (file.endsWith('.model.ts') || file.endsWith('.model.js')) {
    const modelModule = require(path.join(modelsDir, file));
    const modelName = Object.keys(modelModule).find(k => typeof modelModule[k] === 'function' && modelModule[k].prototype instanceof Model);

    if (modelModule.initModel) {
      modelModule.initModel(sequelize);
    }

    if (modelName) {
      models[modelName] = modelModule[modelName];
    }

    models[`__assoc__${file}`] = modelModule.associate;
  }
}

for (const key in models) {
  if (key.startsWith('__assoc__') && typeof models[key] === 'function') {
    models[key](models);
  }
}


export { sequelize, models };