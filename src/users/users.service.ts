import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(Email: string): Promise<Users> {
    return await this.userRepository.findOne({ email: Email });
  }

  async saveUser(user: Users): Promise<Users> {
    return await this.userRepository.save(user);
  }

  async changePassword(email, password): Promise<UpdateResult> {
    return await this.userRepository.update({ email: email }, { password: await hash(password, 10) });
  }
}