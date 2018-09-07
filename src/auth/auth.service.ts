import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import { ErrorMessage } from '../shared/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async login(body): Promise<string> {
    const user: Users = await this.validateUser(body);
    if (!user) throw new ErrorMessage('user:notFound');
    return await this.jwtService.sign(body);
  }

  async validateUser(body): Promise<Users> {
    return await this.usersService.findOneByEmail(body.email);
  }
}