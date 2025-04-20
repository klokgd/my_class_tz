import { Router } from 'express';
import lessonRouter from './lesson.route';

export default Router().use('/lessons', lessonRouter)