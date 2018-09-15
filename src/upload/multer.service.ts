import { Injectable, MulterModuleOptions, MulterOptionsFactory } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './upload');
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
      limits: {
        fileSize: 2097152,
      },
      fileFilter: (req, file, cb) => {
        const fileTypes = /image|jpeg|jpg|png|gif|webp|pdf|text/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
          return cb(null, true);
        }
        cb(null, false);
      },
    };
  }
}