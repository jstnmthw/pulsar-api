import { AppService } from '@/app.service';
import { AppResolver } from '@/app.resolver';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      providers: [AppService, AppResolver, ConfigService],
    }).compile();
  });

  afterAll(async () => {
    await appModule.close();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
