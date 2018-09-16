import { Module, MulterModule } from '@nestjs/common';
import { MulterConfigService } from './multer.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [MulterModule.registerAsync({
    useClass: MulterConfigService,
  })],
  controllers: [UploadController],
})
export class UploadModule {
}
