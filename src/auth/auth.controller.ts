import { Controller, Get, Post, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ErrorMessage } from '../shared/errors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  // @Get('token')
  // async createToken(payload): Promise<any> {
  //   return await this.authService.checkUser(payload);payload
  // }

  @Post('login')
  async login(@Body() body, @Res() res): Promise<any> {
    if (!body || !(body.email && body.password)) throw new ErrorMessage('auth:login:missing');
    res.status(HttpStatus.ACCEPTED).json('Bearer ' + await this.authService.login(body));
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    // This route is restricted by AuthGuard
    // JWT strategy
  }
}