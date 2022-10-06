import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses-service';
import { EnrollmentsService } from '../../../services/enrollments-service';
import { StudentsService } from '../../../services/students-service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  async enrollments() {
    return await this.enrollmentsService.listAllenrollments();
  }

  @ResolveField(() => Student)
  async student(@Parent() enrollment: Enrollment) {
    return await this.studentsService.getById(enrollment.studentId);
  }

  @ResolveField(() => Course)
  async course(@Parent() enrollment: Enrollment) {
    return await this.coursesService.getById(enrollment.courseId);
  }
}
