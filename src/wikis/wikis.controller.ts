import { Controller, Get, Res, HttpStatus, UseGuards, Query, Delete, Post, Body, Req } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';
import { WikiService } from './wikis.service';

@Controller('wiki')
export class WikiController {
  constructor(private readonly wikiService: WikiService,
  ) {
  }

  @Post()
  @UseGuards(new RoleGuard())
  async add(@Req() req, @Body() body, @Res() res) {
    const result = { success: true };
    try {
      this.wikiService.write(body, req.payload.email);
    } catch (e) {
      result.success = false;
    }
    res.status(HttpStatus.OK).json(result);
  }

  @Delete()
  @UseGuards(new RoleGuard())
  async remove(@Query() param, @Res() res) {
    const { name, mdName } = param;
    res.status(HttpStatus.OK).json({ success: true });
  }
}