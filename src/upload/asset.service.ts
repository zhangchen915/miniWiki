import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { Article } from '../wikis/article.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly usersService: UsersService,
  ) {
  }

  async saveAsset(email, id, file) {
    const { filename, size, mimetype } = file;
    return await this.assetRepository.save({
      name: filename,
      mime: mimetype,
      size,
      uploadTime: new Date(),
      uploadBy: await this.usersService.findOneByEmail(email),
      article: await this.articleRepository.findOne({ id }),
    });
  }
}