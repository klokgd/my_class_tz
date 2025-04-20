import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { LessonService } from '../services/lesson.service';
import { LessonFilters } from '../dto/lessons-filter.query.dto';

export class LessonController {
  private service = new LessonService();

  async getLessons(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const filters: LessonFilters = {
        ...req.query,
        page: Number(req.query.page),
        lessonsPerPage: Number(req.query.lessonsPerPage)
      };

      const lessons = await this.service.getLessons(filters);
      res.json(lessons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}