import { ObjectType, ID, Field, Directive } from '@nestjs/graphql';
import { Purchase } from './purchase';

@ObjectType()
@Directive('@key(fields: "authUserId")')
export class Customer {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  auth_user_id: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
