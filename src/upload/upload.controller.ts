import { Controller, Get, Res, HttpStatus, UploadedFiles, UseInterceptors, Post, FileInterceptor, Req, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';

@Controller('upload')
export class UploadController {
  constructor(
  ) {
  }

  @Post()
  // @UseGuards(new RoleGuard())
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFiles() files) {
    console.log(files);
  }
}