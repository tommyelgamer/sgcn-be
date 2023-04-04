import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '../../user/user.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    // super({
    //   jwtFromRequest: ExtractJwt.fromExtractors([
    //     (request: Request) => {
    //       return request?.cookies?.Authentication;
    //     },
    //   ]),
    //   secretOrKey: configService.get('JWT_SECRET'),
    // });
    super({
      ignoreExpiration: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req.cookies.Authentication) {
            return req.cookies.Authentication;
          } else {
            console.error('Error finding cookie');
          }
          return null;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userService.getByUsername(
      Number(payload.userData.championshipId),
      payload.userData.username,
    );
    const { password, ...userToReturn } = user;
    return userToReturn;
  }
}
