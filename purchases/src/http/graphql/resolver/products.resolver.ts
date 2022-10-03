import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from '../../../services/products.service';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';

import { Product } from '../models/product';
import { CreateProductInput } from '../inputs/create-product-Input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private producstService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.producstService.listAllProducts();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.producstService.createProduct(data);
  }
}
