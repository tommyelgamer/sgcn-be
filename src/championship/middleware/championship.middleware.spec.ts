import { TestingModule, Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { ChampionshipMiddleware } from './championship.middleware';
import { RequestWithChampionship } from '../dto/request-with-championship';
import { Response } from 'express';
import { ChampionshipService } from '../championship.service';
import { Championship } from 'src/entities/championship.entity';
import { BadRequestException } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('ChampionshipMiddleware', () => {
  let championshipMiddleware: ChampionshipMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChampionshipMiddleware],
    })
      .useMocker((token) => {
        const championships: Championship[] = [
          {
            id: 1,
            code: 'vf2023',
            shortname: 'Vela Fest 2023',
            longname: '2023 Rio de la Plata Vela Fest!!!',
            isActive: true,
          },
        ];
        if (token === ChampionshipService) {
          return {
            getChampionshipByCode: jest.fn((code: string) =>
              championships.find(
                (championship: Championship) => championship.code === code,
              ),
            ),
          };
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

    championshipMiddleware = module.get<ChampionshipMiddleware>(
      ChampionshipMiddleware,
    );
  });

  it('Should be defined', () => {
    expect(championshipMiddleware).toBeDefined();
  });

  describe('use', () => {
    it('Should inject championship data into req', async () => {
      const req = {
        params: {
          championshipCode: 'vf2023',
        },
        championship: {},
      } as unknown as RequestWithChampionship;
      const res = {} as Response;

      await championshipMiddleware.use(req, res, () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const t = '';
      });

      expect(req.championship).toStrictEqual({
        id: 1,
        code: 'vf2023',
        longname: '2023 Rio de la Plata Vela Fest!!!',
        shortname: 'Vela Fest 2023',
      });
    });

    // it('Should throw an exception if an active championship with the code is not found', async () => {
    //   const req = {
    //     params: {
    //       championshipCode: 'not_existant',
    //     },
    //     championship: {},
    //   } as unknown as RequestWithChampionship;
    //   const res = {} as Response;

    //   const result = championshipMiddleware.use(req, res, () => {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const t = '';
    //   });

    //   expect(result).rejects.toBeInstanceOf(BadRequestException);
    // });
  });
});
