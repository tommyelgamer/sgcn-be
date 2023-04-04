import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { UserService } from '../user/user.service';
import { Championship } from '../entities/championship.entity';
import { User } from '../entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService],
    })
      .useMocker((token) => {
        const users: User[] = [
          {
            id: 1,
            username: 'test_user',
            password:
              '$2a$10$NfIbd0spOOFcSNRp5GhUuujg2KBf6G9TyhAAw9GQvQWgmoKODttTC',
            championshipId: 1,
            championship: new Championship(),
            role: 'SYS_ADMIN',
          },
        ];
        if (token === UserService) {
          return {
            getByUsername: jest.fn(
              (championshipId: number, username: string) => {
                const user = users.find(
                  (user) =>
                    user.championshipId === championshipId &&
                    user.username === username,
                );

                if (user) return user;
                throw new NotFoundException();
              },
            ),
          };
        }
        if (token === ConfigService) {
          return {
            get: (config: string) => {
              switch (config) {
                case 'JWT_TOKEN':
                  return 'testtoken';
                case 'JWT_EXPIRATION_TIME':
                  return 3600;
                default:
                  break;
              }
            },
          };
        }
        if (token === JwtService) {
          return {
            sign: () =>
              'eyJhbGciOiJIUzI1NiJ9.e30.4E_Bsx-pJi3kOW9wVXN8CgbATwP09D9V5gxh9-9zSZ0',
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

    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authenticationService).toBeDefined();
  });

  describe('getCookieWithJwtToken', () => {
    it('Should return a string that matches the regex', () => {
      const cookie = authenticationService.getCookieWithJwtToken({
        userData: {
          id: 1,
          championshipId: 1,
          username: 'test',
          role: 'SYS_ADMIN',
        },
      });

      const cookieMatchTheRegex: boolean = new RegExp(
        'Authentication=.+; HttpOnly; Path=/; Max-Age=[0-9]+',
      ).test(cookie);

      expect(cookieMatchTheRegex).toBeTruthy();
    });
  });

  describe('getAuthenticatedUser', () => {
    it("Should return a user without it's password", async () => {
      const user = await authenticationService.getAuthenticatedUser(
        1,
        'test_user',
        'test_password',
      );

      expect(user).toStrictEqual({
        id: 1,
        username: 'test_user',
        championshipId: 1,
        role: 'SYS_ADMIN',
        password: undefined,
        championship: new Championship(),
      });
    });

    it('Should throw an error if user is incorrect', async () => {
      const user = authenticationService.getAuthenticatedUser(
        1,
        'wrong_user',
        'test_password',
      );

      await expect(user).rejects.toBeInstanceOf(BadRequestException);
    });

    it('Should throw an error if password is incorrect', async () => {
      const user = authenticationService.getAuthenticatedUser(
        1,
        'test_user',
        'wrong_password',
      );

      await expect(user).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
