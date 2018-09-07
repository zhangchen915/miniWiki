import { Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hash } from 'bcrypt';

@Controller('register')
export class RegisterController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async register(@Req() req, @Res() res): Promise<any> {
    if (await this.usersService.findOneByEmail(req.body.email)) {
      return res.json({
        error: 1,
        message: 'email exist',
      });
    }

    const now = Date.now();
    res.json(await this.usersService.saveUser(Object.assign(req.body, {
      registerTime: now,
      lastLogin: now,
      registerIP: req.ip,
      password: await hash(req.body.password, 10),
    })));
  }
}