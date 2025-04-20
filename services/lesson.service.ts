import { Op, FindAndCountOptions, WhereOptions } from 'sequelize';
import { Lesson } from '../DB/models/lesson.model';
import { Teacher } from '../DB/models/teacher.model';
import { Student } from '../DB/models/student.model';
import { LessonFilters } from '../dto/lessons-filter.query.dto';
import { LessonResponseDto } from '../dto/lessons.res.dto';



export class LessonService {
  async getLessons(filters: LessonFilters): Promise<LessonResponseDto[]> {
    const options = this.buildQueryOptions(filters);
    const lessons = await Lesson.findAll(options);
    return lessons.map(lesson => this.formatLesson(lesson));
  }

  private buildQueryOptions(filters: LessonFilters): FindAndCountOptions {
    const where: WhereOptions = {};
    
    if (filters.date) {
      const dates = filters.date.split(',');
      where.date = dates.length === 1 
        ? dates[0] 
        : { [Op.between]: dates };
    }

    if (filters.status !== undefined) {
      where.status = filters.status;
    }

    return {
      where,
      include: [
        {
          model: Teacher,
          through: { attributes: [] },
          where: filters.teacherIds 
            ? { id: filters.teacherIds.split(',').map(Number) }
            : undefined
        },
        {
          model: Student,
          through: { attributes: ['visit'] }
        }
      ],
      limit: filters.lessonsPerPage || 5,
      offset: ((filters.page || 1) - 1) * (filters.lessonsPerPage || 5)
    };
  }

  private formatLesson(lesson: Lesson): LessonResponseDto {
    return {
      id: lesson.id,
      date: lesson.date.toISOString().split('T')[0],
      title: lesson.title,
      status: lesson.status,
      visitCount: lesson.students?.filter(s => s.LessonStudent?.visit).length || 0,
      students: lesson.students?.map(s => ({
        ...s.get(),
        visit: s.LessonStudent?.visit
      })) || [],
      teachers: lesson.teachers?.map(t => t.get()) || []
    };
  }
}