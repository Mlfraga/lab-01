import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses-service';
import { EnrollmentsService } from '../../../services/enrollments-service';
import { StudentsService } from '../../../services/students-service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    return await this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    const student = await this.studentsService.getByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      studentId: student.id,
      courseId: id,
    });

    if (!enrollment) {
      throw new Error('This student does not have access to this course');
    }

    return await this.coursesService.getById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  async createCourse(@Args('data') data: CreateCourseInput) {
    return await this.coursesService.createCourse(data);
  }
}
