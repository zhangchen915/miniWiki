import { Controller, Get, Res, HttpStatus, UseGuards, Query, Delete, Post, Body } from '@nestjs/common';
import { ErrorMessage } from '../shared/errors';
import { RoleGuard } from '../guards/role.guard';
import { WikiService } from './wikis.service';
import { mkdirp, outputFile } from 'fs-extra';
import { UsersService } from '../users/users.service';

@Controller('wiki')
export class WikiController {
  constructor(private readonly wikiService: WikiService,
  ) {
  }

  @Post()
  @UseGuards(new RoleGuard())
  async add(@Body() body, @Res() res) {
    const result = { success: true };
    try {
      this.wikiService.write(body);
    } catch (e) {
      result.success = false;
    }
    res.status(HttpStatus.OK).json(result);
  }

  @Delete()
  // @UseGuards(new RoleGuard())
  async remove(@Query() param, @Res() res) {
    const { name, mdName } = param;
    res.status(HttpStatus.OK).json({ success: true });
  }
}