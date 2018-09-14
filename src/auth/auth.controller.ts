import { Controller, Get, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { EmailPasswordDto, PasswordDto } from '../validator/user';

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
  async login(@Body() body: EmailPasswordDto, @Res() res): Promise<any> {
    res.status(HttpStatus.ACCEPTED).json('Bearer ' + await this.authService.token(body));
  }

  @Post('changePassword')
  async changePassword(@Req() req, @Body() body: PasswordDto, @Res() res): Promise<any> {
    await this.usersService.changePassword(req.payload.email, body.password);
    res.status(HttpStatus.ACCEPTED).json();
  }
}