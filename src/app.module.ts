import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';
import { PayloadMiddleware } from './middlewares/payload.middleware';
import { WikisModule } from './wikis/wikis.module';
import { WikiController } from './wikis/wikis.controller';
import { ensureDir } from 'fs-extra';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, RegisterModule, WikisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor() {
    ensureDir('./wikiStore', (err) => {
    });
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PayloadMiddleware)
      .exclude(
        { path: '/login', method: RequestMethod.POST },
      )
      .forRoutes(AppController, WikiController);
  }
}
