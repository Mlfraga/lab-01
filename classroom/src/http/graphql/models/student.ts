import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field()
  authUserId: string;

  enrollmentId: string;

  @Field(() => [Enrollment])
  enrolment: Enrollment[];
}
