import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { Championship } from '../entities/championship.entity';
import { NotFoundException } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    })
      .useMocker((token) => {
        const users: User[] = [
          {
            id: 1,
            championshipId: 1,
            championship: new Championship(),
            username: 'test_user',
            password: 'test_password',
            role: 'SYS_ADMIN',
          },
        ];
        if (token === getRepositoryToken(User)) {
          return {
            findOne: jest.fn(
              ({
                where,
              }: {
                where: { championshipId: number; username: string };
              }) =>
                users.find(
                  (user) =>
                    user.username === where.username &&
                    user.championshipId === where.championshipId,
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

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getByUsername', () => {
    it('Should return a user', async () => {
      const user = await userService.getByUsername(1, 'test_user');

      expect(user).toStrictEqual({
        id: 1,
        championshipId: 1,
        championship: new Championship(),
        username: 'test_user',
        password: 'test_password',
        role: 'SYS_ADMIN',
      });
    });

    it('Should throw an error if user is not found', () => {
      const user = userService.getByUsername(1, 'wrong_user');

      expect(user).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
