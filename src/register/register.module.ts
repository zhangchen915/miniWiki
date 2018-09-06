import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [
    RegisterController,
  ],
  providers: [UsersService],
})
export class RegisterModule {
}
