import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DocumentModule } from '../src/document/document.module';
import { Document } from '../src/entities/document.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DocumentRepositoryMock } from './mock/document-repository.mock';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DocumentModule],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Document)) {
          return DocumentRepositoryMock;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/vf2023/document')
      .expect('success');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([Document]));
  });
});
