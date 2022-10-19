import { Injectable } from '@nestjs/common';

import { KafkaService } from '../messaging/kafka.service';
import { PrismaService } from '../database/prisma/prisma.service';

interface ICreatePurchaseParams {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  async listAllPurchases() {
    return await this.prisma.purchase.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async listPurchasesByCustomerId(customerId: string) {
    return await this.prisma.purchase.findMany({
      orderBy: { created_at: 'desc' },
      where: { customer_id: customerId },
    });
  }

  async createPurchase({ productId, customerId }: ICreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const createdPurchase = await this.prisma.purchase.create({
      data: {
        product_id: productId,
        customer_id: customerId,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    console.log({
      customer: {
        authUserId: customer.auth_user_id,
      },
      product: {
        id: createdPurchase.id,
        title: product.title,
        slug: product.slug,
      },
    });

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.auth_user_id,
      },
      product: {
        id: createdPurchase.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return createdPurchase;
  }
}
