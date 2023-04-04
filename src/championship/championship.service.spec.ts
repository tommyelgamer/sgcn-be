import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { ChampionshipService } from './championship.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Championship } from '../entities/championship.entity';

const moduleMocker = new ModuleMocker(global);

describe('ChampionshipService', () => {
  let service: ChampionshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChampionshipService],
    })
      .useMocker((token) => {
        const results = [];
        if (token === getRepositoryToken(Championship)) {
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

    service = module.get<ChampionshipService>(ChampionshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
