import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hash } from 'bcrypt';
import { EmailPasswordDto } from '../validator/user';

@Controller('register')
export class RegisterController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async register(@Req() req, @Body() body: EmailPasswordDto, @Res() res): Promise<any> {
    if (await this.usersService.findOneByEmail(body.email)) {
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
      password: await hash(body.password, 10),
    })));
  }
}