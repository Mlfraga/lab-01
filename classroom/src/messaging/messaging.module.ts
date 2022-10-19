import { Module } from '@nestjs/common';
import { PurchaseController } from './Controllers/purchases.controller';

@Module({
  controllers: [PurchaseController],
})
export class MessagingModule {}
