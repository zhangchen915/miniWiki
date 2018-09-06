import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, RegisterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
