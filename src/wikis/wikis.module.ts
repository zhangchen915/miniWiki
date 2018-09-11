import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { WikiController } from './wikis.controller';
import { WikiService } from './wikis.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [WikiController],
  providers: [UsersService, WikiService],
})
export class WikisModule {
}
