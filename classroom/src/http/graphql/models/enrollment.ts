import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Course } from './course';
import { Student } from './student';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  studentId: string;

  @Field(() => Student)
  student: Student;

  courseId: string;

  @Field(() => Course)
  course: Course;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date, { nullable: true })
  canceled_at: Date;
}
