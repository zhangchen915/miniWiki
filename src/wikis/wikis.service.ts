import { Injectable } from '@nestjs/common';
import { mkdirp, outputFile } from 'fs-extra';
import { Wikis } from './wikis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class WikiService {
  constructor(
    @InjectRepository(Wikis)
    private readonly wikiRepository: Repository<Wikis>,
    private readonly usersService: UsersService,
  ) {
  }

  async write(body, email) {
    const { name, mdName, data } = body;
    await mkdirp(`./wikiStore/${name}`);
    await this.addWiki({
      wikiName: name,
      createTime: new Date(),
      createBy: await this.usersService.findOneByEmail(email),
    });
    await outputFile(`./wikiStore/${name}/${mdName}.md`, data);
  }

  async addWiki(wiki): Promise<Wikis> {
    return await this.wikiRepository.save(wiki);
  }
}