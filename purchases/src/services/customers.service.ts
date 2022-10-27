import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getCustomerByAuthUserId(authUserId: string) {
    const customers = await this.prisma.customer.findUnique({
      where: {
        authUserId: authUserId,
      },
    });
    return customers;
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    const createdCustomer = await this.prisma.customer.create({
      data: {
        authUserId: authUserId,
      },
    });

    return createdCustomer;
  }
}
