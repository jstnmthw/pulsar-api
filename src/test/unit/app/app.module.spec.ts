import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { Logger } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from '../../../auth/auth.module';
import { UsersModule } from '../../../users/users.module';
import { PostsModule } from '../../../posts/posts.module';
import { AppController } from '../../../app.controller';
import { AppService } from '../../../app.service';
import { AppResolver } from '../../../app.resolver';
import { GqlConfigService } from '../../../gql-config.service';
import config from '../../../common/configs/config';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        PrismaModule.forRoot({
          isGlobal: true,
          prismaServiceOptions: {
            middlewares: [
              // configure your prisma middleware
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
        UsersModule,
        PostsModule,
      ],
      controllers: [AppController],
      providers: [AppService, AppResolver],
    }).compile();
  });

  afterAll(async () => {
    await appModule.close();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
