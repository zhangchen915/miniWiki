import { Module } from '@nestjs/common';
import { Users } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    UsersService,
  ],
})
export class UsersModule {
}
