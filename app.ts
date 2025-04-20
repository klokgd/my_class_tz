import express from 'express';
import { sequelize } from './DB/index';
import lessonRouter from './routes/lesson.route';
import config from 'config'
import { Config } from './config/config.interface';

const allConfig = config.get<Config>('');
const app = express();
const PORT = allConfig.port || 3000;

app.use(express.json());
app.use('/lessons', lessonRouter);
app.use(`/${allConfig.prefix}/`, require("./routes"));


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