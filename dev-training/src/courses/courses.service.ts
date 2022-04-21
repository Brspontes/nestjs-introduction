import { Course } from './../entities/course.entity';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do framework NestJs',
      description: 'Fundamentos do framework NestJs',
      tags: ['nodejs', 'nestjs', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((c) => c.id === Number(id));
    if (!course) {
      throw new HttpException(
        `Course id: ${id} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  create(createCourseDto: any) {
    return this.courses.push(createCourseDto);
  }

  update(id: string, updateCourseDto: any) {
    const indexCourse = this.courses.findIndex((c) => c.id === Number(id));
    this.courses[indexCourse] = updateCourseDto;
  }

  remove(id: string) {
    const indexCourse = this.courses.findIndex((c) => c.id === Number(id));

    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1);
    }
  }
}
