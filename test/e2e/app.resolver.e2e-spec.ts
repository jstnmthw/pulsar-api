import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Chance } from 'chance';
import { AppModule } from '@/app.module';

const chance = new Chance();

describe('AppResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('helloWorld (Query)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ helloWorld }',
      })
      .expect(200);
  });
  it('hello (Query)', () => {
    const name = chance.name();
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{ hello(name: "${name}") }`,
      })
      .expect(200);
  });
});
