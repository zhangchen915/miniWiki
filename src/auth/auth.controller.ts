import { Controller, Get, Post, Body, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorMessage } from '../shared/errors';
import { RoleGuard } from '../guards/role.guard';

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
    res.status(HttpStatus.ACCEPTED).json('Bearer ' + await this.authService.token(body));
  }

  @Get('data')
  @UseGuards(new RoleGuard())
  async role(@Req() req, @Res() res) {
    const user = await this.authService.validateUser(req.payload);
    res.status(HttpStatus.OK).json(user.role);
  }
}