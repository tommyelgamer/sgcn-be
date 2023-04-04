import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Document } from '../entities/document.entity';
import { DocumentService } from './document.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const moduleMocker = new ModuleMocker(global);

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentService],
    })
      .useMocker((token) => {
        const results = [];
        if (token === getRepositoryToken(Document)) {
          return {};
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

    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
