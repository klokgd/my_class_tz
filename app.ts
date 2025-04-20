import express from 'express';
import config from 'config'
import { sequelize } from './DB/index.js';
import { Config } from './config/config.interface.js';
import routes from './routes/index.js';

const appConfig = config.get<Config>('app');
const app = express();
const PORT = appConfig.port || 3000;

app.use(express.json());
app.use(`/${appConfig.prefix}/`, routes);


const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

initialize();