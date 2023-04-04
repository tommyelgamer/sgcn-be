import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { AuthenticationService } from '../authentication.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      passReqToCallback: true,
    });
  }
  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(
      Number(req.body.championshipId),
      username,
      password,
    );
  }
}
