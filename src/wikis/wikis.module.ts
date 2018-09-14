import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { WikiController } from './wikis.controller';
import { WikiService } from './wikis.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wikis } from './wikis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wikis]), UsersModule],
  controllers: [WikiController],
  providers: [UsersService, WikiService],
})
export class WikisModule {
}
