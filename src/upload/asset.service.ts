import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    private readonly usersService: UsersService,
  ) {
  }

  async saveAsset(email, file) {
    const { filename, size, mimetype } = file;
    return await this.assetRepository.save({
      name: filename,
      mime: mimetype,
      size: size,
      uploadTime: new Date(),
      uploadBy: await this.usersService.findOneByEmail(email),
    });
  }
}