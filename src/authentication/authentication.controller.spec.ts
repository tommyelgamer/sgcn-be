import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { RequestWithUser } from './dto/request-with-user.dto';
import { Response } from 'express';

const moduleMocker = new ModuleMocker(global);

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
    })
      .useMocker((token) => {
        if (token === AuthenticationService) {
          return {
            getCookieWithJwtToken: jest.fn(),
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

    authenticationController = module.get<AuthenticationController>(
      AuthenticationController,
    );
  });

  it('should be defined', () => {
    expect(authenticationController).toBeDefined();
  });

  describe('authenticate', () => {
    it('Should return the user in req.user', () => {
      const userData = {
        id: 1,
        championshipId: 1,
        username: 'test_user',
        role: 'SYS_ADMIN',
      };

      const req = {
        user: userData,
      } as RequestWithUser;

      const res = authenticationController.authenticate(req);

      expect(res).toBe(userData);
    });
  });

  describe('logIn', () => {
    it('Should call res.Set-Cookie and res.send', async () => {
      const res = {
        setHeader: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      const req = {
        user: {
          id: 1,
          championshipId: 1,
          username: 'test_user',
          role: 'SYS_ADMIN',
        },
      } as RequestWithUser;

      await authenticationController.logIn(req, res);

      expect(res.setHeader).toBeCalledTimes(1);
      expect(res.send).toBeCalledTimes(1);
    });
  });
});
