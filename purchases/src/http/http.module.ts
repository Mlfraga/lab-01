import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { ProductsResolver } from './graphql/resolver/products.resolver';
import path from 'node:path';
import { ProductsService } from '../services/products.service';
import { PurchasesService } from '../services/purchases.service';
import { PurchasesResolver } from './graphql/resolver/purchases.resolver';
import { CustomersService } from '../services/customers.service';
import { CustomersResolver } from './graphql/resolver/customer.resolver';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CustomersResolver,
    ProductsResolver,
    PurchasesResolver,

    CustomersService,
    ProductsService,
    PurchasesService,
  ],
})
export class HttpModule {}
