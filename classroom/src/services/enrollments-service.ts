import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

interface CreateEnrollmentParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  listAllenrollments() {
    return this.prisma.enrollment.findMany({
      where: { canceled_at: null },
      orderBy: { created_at: 'desc' },
    });
  }

  createEnrollment(data: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({ data });
  }

  getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: { courseId, studentId, canceled_at: null },
    });
  }

  getByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId, canceled_at: null },
      orderBy: { created_at: 'desc' },
    });
  }
}
