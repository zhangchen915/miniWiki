import { Controller, Get, Post, Body, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorMessage } from '../shared/errors';
import { RoleGuard } from '../guards/role.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly usersService: UsersService,
  ) {
  }

  @Get('token')
  async createToken(@Req() body, @Res() res): Promise<any> {
    res.status(HttpStatus.OK).json(await this.authService.token(body));
  }

  @Post('login')
  async login(@Body() body, @Res() res): Promise<any> {
    if (!body || !(body.email && body.password)) throw new ErrorMessage('auth:login:missing');
    res.status(HttpStatus.ACCEPTED).json('Bearer ' + await this.authService.token(body));
  }

  @Post('changePassword')
  async changePassword(@Req() req, @Res() res): Promise<any> {
    if (!req.body || !req.body.password) throw new ErrorMessage('auth:body:missing');
    await this.usersService.changePassword(req.payload.email, req.body.password);
    res.status(HttpStatus.ACCEPTED).json();
  }

  @Get('data')
  @UseGuards(new RoleGuard())
  async role(@Req() req, @Res() res) {
    const user = await this.authService.validateUser(req.payload);
    res.status(HttpStatus.OK).json(user.role);
  }
}