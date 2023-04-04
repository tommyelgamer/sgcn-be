import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { ChampionshipController } from './championship.controller';

const moduleMocker = new ModuleMocker(global);

describe('ChampionshipController', () => {
  let controller: ChampionshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChampionshipController],
    })
      .useMocker((token) => {
        const results = [];
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<ChampionshipController>(ChampionshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
