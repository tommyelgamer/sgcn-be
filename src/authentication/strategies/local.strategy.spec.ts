import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Request } from 'express';
import { LocalStrategy } from './local.strategy';
import { AuthenticationService } from '../authentication.service';

const moduleMocker = new ModuleMocker(global);

describe('Passport LocalStrategy', () => {
  let localStrategy: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy],
    })
      .useMocker((token) => {
        if (token === AuthenticationService) {
          return {
            getAuthenticatedUser: () => ({
              id: 1,
              championshipId: 1,
              username: 'test_user',
              role: 'SYS_ADMIN',
            }),
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

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('Should return an authenticated user data', async () => {
      const userData = {
        id: 1,
        championshipId: 1,
        username: 'test_user',
        role: 'SYS_ADMIN',
      };

      const req = {
        body: {
          championshipId: 1,
        },
      } as unknown as Request;

      const res = await localStrategy.validate(
        req,
        userData.username,
        'test_password',
      );

      expect(res).toStrictEqual(userData);
    });
  });
});
