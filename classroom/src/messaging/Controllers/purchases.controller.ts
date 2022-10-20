import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses-service';
import { EnrollmentsService } from '../../services/enrollments-service';
import { StudentsService } from '../../services/students-service';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @MessagePattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.getBySlug(payload.product.slug);

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
        slug: payload.product.slug,
      });
    }

    await this.enrollmentsService.createEnrollment({
      studentId: student.id,
      courseId: course.id,
    });
  }
}
