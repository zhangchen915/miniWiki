import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import { ErrorMessage } from '../shared/errors';
import { mkdirp, outputFile } from 'fs-extra';

@Injectable()
export class WikiService {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  async write(body) {
    const { name, mdName, data } = body;
    await mkdirp(`./wikiStore/${name}`);
    await outputFile(`./wikiStore/${name}/${mdName}.md`, data);
  }
}