import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RequestWithUser } from './dto/request-with-user.dto';
import { LocalAuthenticationGuard } from './guards/authentication.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() req: RequestWithUser) {
    return req.user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;

    const cookie = this.authenticationService.getCookieWithJwtToken({
      userData: user,
    });
    res.cookie('Authentication', cookie, {
      maxAge: this.configService.get<number>('JWT_EXPIRATION_TIME') * 1000,
    });

    // const cookieUserData =
    //   this.authenticationService.getCookieWithUserData(user);
    res.cookie('UserData', user, {
      maxAge: this.configService.get<number>('JWT_EXPIRATION_TIME') * 1000,
    });

    return res.send(user);
  }

  @HttpCode(200)
  @Get('logout')
  async logOut(@Res() res: Response) {
    const cookieForLogout = this.authenticationService.getCookieForLogOut();

    res.cookie(
      'Authentication',
      {},
      {
        maxAge: 1,
      },
    );
    res.cookie(
      'UserData',
      {},
      {
        maxAge: 1,
      },
    );
    return res.send('OK');
  }
}
