import { Router } from 'express';
import { check } from 'express-validator';
import { LessonController } from '../controllers/lesson.contoller';
import { dateValidator } from './validators/date.validator';

const lessonRouter = Router();
const controller = new LessonController();

lessonRouter.get('', [
  check('date').optional().custom(dateValidator),
  check('status').optional().isIn([0, 1]),
  check('teacherIds').optional().isString(),
  check('studentsCount').optional().matches(/^\d+,\d+$|^\d+$/),
  check('page').optional().isInt({ min: 1 }),
  check('lessonsPerPage').optional().isInt({ min: 1 })
], controller.getLessons);

export default lessonRouter;