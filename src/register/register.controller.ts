import { Controller, Post, Request, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { bcrypt } from 'bcrypt';

@Controller('register')
export class RegisterController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async register(@Request() req, @Res() res): Promise<any> {
    if (await this.usersService.findOneByEmail(req.body.email)) {
      return res.json({
        error: 1,
        message: 'email exist',
      });
    }

    const now = Date.now();
    return await this.usersService.saveUser(Object.assign(req.body, {
      registerTime: now,
      lastLogin: now,
      registerIP: req.ip,
      password: await bcrypt.hash(req.body.password.password, 10),
    }));
  }
}