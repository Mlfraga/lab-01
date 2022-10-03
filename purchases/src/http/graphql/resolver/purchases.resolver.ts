import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';

import { PurchasesService } from '../../../services/purchases.service';
import { Purchase } from '../models/purchase';
import { ProductsService } from '../../../services/products.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { AuthUser, CurrentUser } from '../../..//http/auth/current-user';
import { CustomersService } from '../../../services/customers.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private customersService: CustomersService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return this.purchasesService.createPurchase({
      ...data,
      customerId: customer.id,
    });
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.product_id);
  }
}
