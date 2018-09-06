import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

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

  async findOneByEmail(email: string): Promise<Users> {
    return await this.photoRepository.findOne({ email: email });
  }

  async saveUser(user: Users): Promise<Users> {
    return await this.photoRepository.save(user);
  }
}