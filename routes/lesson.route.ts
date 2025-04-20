import { Router } from 'express';
import { check } from 'express-validator';
import { LessonController } from '../controllers/lesson.contoller';

const lessonRouter = Router();
const controller = new LessonController();

lessonRouter.get('/lessons', [
  check('date').optional().isDate(),
  check('status').optional().isIn([0, 1]),
  check('teacherIds').optional().isString(),
  check('studentsCount').optional().matches(/^\d+,\d+$|^\d+$/),
  check('page').optional().isInt({ min: 1 }),
  check('lessonsPerPage').optional().isInt({ min: 1 })
], controller.getLessons.bind(controller));

export default lessonRouter;