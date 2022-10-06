import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface getByCourseAndStudentIdParams {
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

  getByCourseAndStudentId({
    courseId,
    studentId,
  }: getByCourseAndStudentIdParams) {
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
