import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async createToken(payload): Promise<any> {
    return await this.authService.checkUser(payload);
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    // This route is restricted by AuthGuard
    // JWT strategy
  }
}