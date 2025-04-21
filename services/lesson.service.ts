import {
    Op,
    FindAndCountOptions,
    WhereOptions,
    Sequelize,
    literal,
    fn,
    col,
} from "sequelize";
import { LessonFilters } from "../dto/lessons-filter.query.dto";
import { LessonResponseDto } from "../dto/lessons.res.dto";
import { models } from "../DB";
import { default as LessonModel } from "../DB/models/lesson.model";
import Teacher from "../DB/models/teacher.model";
import Student from "../DB/models/student.model";
import { Literal } from "sequelize/types/utils";

export class LessonService {
    async getLessons(filters: LessonFilters): Promise<{lessons: LessonResponseDto[], total: number}> {
        console.log("filters:", filters);
        const options: FindAndCountOptions = this.buildQueryOptions(filters);
        console.log("options:", options);
        const lessons = (await models.Lesson.findAll(options)) as LessonModel[];
        const { count: total  } = await models.Lesson.findAndCountAll({
            ...options,
            distinct: true,
        });
        const formatLessons = lessons.map((lesson) => this.formatLesson(lesson));
        return { total, lessons: formatLessons };
    }

    private buildQueryOptions(filters: LessonFilters): FindAndCountOptions {
        console.log("filters:", filters);
        const where: WhereOptions = {};
        if (filters.date) {
            const dates = filters.date.split(",");
            console.log("dates:", dates);
            where.date =
                dates.length === 1 ? dates[0] : { [Op.between]: dates };
        }

        if (filters.status !== undefined) {
            where.status = filters.status;
        }

        const include = [
            filters.teacherIds?.length
                ? {
                      model: Teacher,
                      as: "teachers",
                      through: { attributes: [] },
                      where: {
                          id: filters.teacherIds.split(",").map(Number),
                      },
                  }
                : {
                      model: Teacher,
                      as: "teachers",
                      through: { attributes: [] },
                  },
            {
                model: Student,
                as: "students",
                through: { attributes: ["visit"] },
            },
        ].filter((i): i is NonNullable<typeof i> => Boolean(i));

        if (filters.studentsCount) {
            const countSubq = Sequelize.literal(`(
            SELECT COUNT(DISTINCT "lesson_students"."student_id")
            FROM "lesson_students"
            WHERE "lesson_students"."lesson_id" = "Lesson"."id"
          )`);
            const parts = filters.studentsCount.split(",").map(Number);
            if (parts.length === 2) {
                (where as any)[Op.and] = Sequelize.where(countSubq, {
                    [Op.between]: [parts[0], parts[1]],
                });
            } else {
                (where as any)[Op.and] = Sequelize.where(countSubq, parts[0]);
            }
        }

        return {
            order: [["id", "ASC"]],
            where,
            include,
            limit: filters.lessonsPerPage || 5,
            offset: ((filters.page || 1) - 1) * (filters.lessonsPerPage || 5),
        };
    }

    private formatLesson(lesson: LessonModel): LessonResponseDto {
        console.log("lesson:", lesson);
        const formatLesson = lesson.get({ plain: true }) as LessonModel;
        return {
            id: formatLesson.id,
            date: formatLesson.date,
            title: formatLesson.title,
            status: formatLesson.status,
            visitCount:
                formatLesson.students?.filter((s) => s.LessonStudent?.visit)
                    .length || 0,
            students:
                lesson.students?.map((s) => ({
                    ...s.get(),
                    visit: s.LessonStudent?.visit,
                })) || [],
            teachers: lesson.teachers?.map((t) => t.get()) || [],
        };
    }
}
