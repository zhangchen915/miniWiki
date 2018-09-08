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

  async token(body): Promise<string> {
    const user: Users = await this.validateUser(body);
    if (!user) throw new ErrorMessage('user:notFound');
    return await this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async validateUser(body): Promise<Users> {
    return await this.usersService.findOneByEmail(body.email);
  }
}