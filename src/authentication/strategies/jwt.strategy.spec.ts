import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';

const moduleMocker = new ModuleMocker(global);

describe('Passport JWT', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            getByUsername: jest.fn(() => ({
              id: 1,
              championshipId: 1,
              username: 'test_user',
              role: 'SYS_ADMIN',
            })),
          };
        }
        if (token === ConfigService) {
          return {
            get: (value: string) => {
              switch (value) {
                case 'JWT_SECRET':
                  return 'test_token';

                default:
                  break;
              }
            },
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

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('Should return user data', async () => {
      const result = await jwtStrategy.validate({
        userData: {
          id: 1,
          championshipId: 1,
          username: 'test_user',
          role: 'SYS_ADMIN',
        },
      });

      expect(result).toStrictEqual({
        id: 1,
        championshipId: 1,
        username: 'test_user',
        role: 'SYS_ADMIN',
      });
    });
  });
});
