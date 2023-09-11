import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from '../../../app.service';
import { AppResolver } from '../../../app.resolver';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      providers: [
        AppService,
        AppResolver,
        ConfigModule,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({ JWT_ACCESS_SECRET: 'secret' }),
          },
        },
      ],
    }).compile();
  });

  afterAll(async () => {
    await appModule.close();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
