import { ObjectType, ID, Field, registerEnumType } from '@nestjs/graphql';
import { Product } from './product';

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available Purchases Status',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field()
  created_at: Date;

  @Field(() => Product)
  product: Product;

  product_id: string;
}
