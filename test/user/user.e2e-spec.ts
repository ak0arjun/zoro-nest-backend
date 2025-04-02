import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from '../../src/shared_resources/all_exception.filter';

jest.mock('@getbrevo/brevo', () => {
  return {
    TransactionalEmailsApi: jest.fn().mockImplementation(() => {
      return {
        setApiKey: jest.fn().mockImplementation((data) => {
          console.log(data);
        }),
        sendTransacEmail: jest.fn().mockImplementation((data) => {
          console.log(data);
        }),
      };
    }),
  };
});

describe('User (e2e) apis', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();

    const { httpAdapter } = app.get(HttpAdapterHost);
    // Global exception filter to catch any uncaught exceptions
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    // Global validation pipe to validate incoming requests
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('Post login without any email', async () => {
    const res = await request(app.getHttpServer()).post('/login').send();
    expect(res.status).toBe(400);
    const resData = res.body as Record<string, unknown>;
    expect((resData.message as Array<string>)[0]).toBe(
      'email must be an email',
    );
  });

  it('Post login with empty email', async () => {
    const res = await request(app.getHttpServer()).post('/login').send({
      email: '',
    });
    expect(res.status).toBe(400);
    const resData = res.body as Record<string, unknown>;
    expect((resData.message as Array<string>)[0]).toBe(
      'email must be an email',
    );
  });

  it('Post login with incorrect email', async () => {
    const res = await request(app.getHttpServer()).post('/login').send({
      email: 'adsfdsf',
    });
    expect(res.status).toBe(400);
    const resData = res.body as Record<string, unknown>;
    expect((resData.message as Array<string>)[0]).toBe(
      'email must be an email',
    );
  });

  it('Post login with correct email', async () => {
    const res = await request(app.getHttpServer()).post('/login').send({
      email: 'a@a.com',
    });
    expect(res.status).toBe(201);
  });
});
