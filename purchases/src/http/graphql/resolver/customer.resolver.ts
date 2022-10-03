import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';

import { AuthUser, CurrentUser } from '../../..//http/auth/current-user';
import { CustomersService } from '../../../services/customers.service';
import { Customer } from '../models/customer';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  product(@Parent() customer: Customer) {
    return this.purchasesService.listPurchasesByCustomerId(customer.id);
  }
}
