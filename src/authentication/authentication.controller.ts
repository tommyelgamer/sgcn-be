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

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

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
    res.setHeader('Set-Cookie', cookie);
    return res.send(user);
  }

  @HttpCode(200)
  @Get('logout')
  async logOut(@Res() res: Response) {
    const cookieForLogout = this.authenticationService.getCookieForLogOut();

    res.setHeader('Set-Cookie', cookieForLogout);
    return res.send('OK');
  }
}
