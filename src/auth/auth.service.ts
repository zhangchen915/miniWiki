import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { bcrypt } from 'bcrypt';
import { Users } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async checkUser(payload): Promise<string> {
    const user: Users = await this.validateUser(payload);
    if (await bcrypt.compare(payload.password, user.password)) {
      return this.jwtService.sign(user.password);
    }

  }

  async validateUser(payload): Promise<Users> {
    return await this.usersService.findOneByEmail(payload.email);
  }
}