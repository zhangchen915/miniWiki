import { Controller, Get, Res, HttpStatus, UploadedFile, UseInterceptors, Post, FileInterceptor, Req, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';
import { AssetService } from './asset.service';
import { UsersService } from '../users/users.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly assetService: AssetService,
  ) {
  }

  @Post()
  @UseGuards(new RoleGuard())
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Req() req, @UploadedFile() file) {
    this.assetService.saveAsset(req.payload.email, file);
  }
}