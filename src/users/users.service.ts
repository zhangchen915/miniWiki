import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly photoRepository: Repository<Users>,
  ) {
  }

  async findAll(): Promise<Users[]> {
    return await this.photoRepository.find();
  }

  async findOneByEmail(Email: string): Promise<Users> {
    return await this.photoRepository.findOne({ email: Email });
  }

  async saveUser(user: Users): Promise<Users> {
    return await this.photoRepository.save(user);
  }

  async changePassword(email, password): Promise<UpdateResult> {
    return await this.photoRepository.update({ email: email }, { password: password });
  }
}