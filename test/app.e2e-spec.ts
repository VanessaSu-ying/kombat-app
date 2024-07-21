import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { inputBody, outputKombatResponse } from './e2e.fixture';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', async () => {
    const result = await request(app.getHttpServer())
      .post('/kombat')
      .send(inputBody);

    expect(result.status).toEqual(200);
    expect(result.body).toBeDefined();
    expect(result.body).toEqual(outputKombatResponse);
  });
});
