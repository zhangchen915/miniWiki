import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';
import { PayloadMiddleware } from './middlewares/payload.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, RegisterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PayloadMiddleware)
      .forRoutes('auth');
  }
}
