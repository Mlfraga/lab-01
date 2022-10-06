import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateCourseInput } from '../http/graphql/inputs/create-course-input';
import slugify from 'slugify';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async createCourse({ title }: CreateCourseInput) {
    const slug = slugify(title, { lower: true });

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
