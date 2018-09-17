import { Injectable } from '@nestjs/common';
import { mkdirp, outputFile } from 'fs-extra';
import { Wikis } from './wikis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Article } from './article.entity';

@Injectable()
export class WikiService {
  constructor(
    @InjectRepository(Wikis)
    private readonly wikiRepository: Repository<Wikis>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly usersService: UsersService,
  ) {
  }

  async write(body, email) {
    const { name, mdName, data, state = 0, commitMessage } = body;
    await mkdirp(`./wikiStore/${name}`);
    const user = await this.usersService.findOneByEmail(email);
    const wiki = await this.findWikiByName(name);
    const article = await this.findArticleByName(mdName);
    if (!wiki) await this.addWiki({
      wikiName: name,
      createTime: new Date(),
      createBy: user,
    });

    if (!article) await this.addArticle({
      title: mdName,
      createBy: user,
      wiki,
      createTime: new Date(),
      state,
      commitMessage,
    });

    await outputFile(`./wikiStore/${name}/${mdName}.md`, data);
  }

  async addWiki(wiki): Promise<Wikis> {
    return await this.wikiRepository.save(wiki);
  }

  async findWikiByName(wikiName): Promise<Wikis> {
    return await this.wikiRepository.findOne({ wikiName });
  }

  async findArticleByName(name): Promise<Article> {
    return await this.articleRepository.findOne({ title: name });
  }

  async addArticle(article): Promise<Article> {
    return await this.articleRepository.save(article);
  }
}