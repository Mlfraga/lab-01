import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

interface ICreatePurchaseParams {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

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

    return createdPurchase;
  }
}
