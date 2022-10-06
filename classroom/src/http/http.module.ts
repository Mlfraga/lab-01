import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import path from 'node:path';
import { EnrollmentsResolver } from './graphql/resolvers/enrollment-resolver';
import { CoursesResolver } from './graphql/resolvers/course-resolver';
import { StudentsResolver } from './graphql/resolvers/students-resolver';
import { EnrollmentsService } from '../services/enrollments-service';
import { CoursesService } from '../services/courses-service';
import { StudentsService } from '../services/students-service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    EnrollmentsResolver,
    CoursesResolver,
    StudentsResolver,

    EnrollmentsService,
    CoursesService,
    StudentsService,
  ],
})
export class HttpModule {}
