import { AppService } from './app.service';
import { AuthModule } from '@/authn/auth.module';
import { UsersModule } from './users/users.module';
import { AppResolver } from './app.resolver';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { GqlConfigService } from './gql-config.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { CaslModule } from './casl/casl.module';
import config from './common/configs/config';
import { AuthzModule } from '@/authz/authz.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    AuthzModule,
    UsersModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
