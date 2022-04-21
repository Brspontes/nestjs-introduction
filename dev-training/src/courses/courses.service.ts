import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './../entities/course.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Tag } from 'src/entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Course)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  findAll() {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  findOne(id: string) {
    const course = this.courseRepository.findOne({
      where: {
        id: Number(id),
      },
      relations: ['tags'],
    });
    if (!course) {
      throw new NotFoundException(`Course id: ${id} não encontrado`);
    }
  }

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const course = this.courseRepository.create({
      ...createCourseDto,
      tags,
    });
    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id: Number(id),
      ...updateCourseDto,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Course id: ${id} não encontrado`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!course) {
      throw new NotFoundException(`Course id: ${id} não encontrado`);
    }

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: {
        name: name,
      },
    });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
