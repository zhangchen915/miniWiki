import { Module, MulterModule } from '@nestjs/common';
import { MulterConfigService } from './multer.service';
import { UploadController } from './upload.controller';
import { AssetService } from './asset.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MulterModule.registerAsync({
    useClass: MulterConfigService,
  }), TypeOrmModule.forFeature([Asset]), UsersModule],
  controllers: [UploadController],
  providers: [AssetService, UsersService],
})
export class UploadModule {
}
