import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SheetService } from './sheet.service';
import { ValidationError } from 'sequelize';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/user.model';
import { Sheet } from './sheet.model';

@Controller('sheets')
export class SheetController {
  constructor(private sheetService: SheetService) {}

  @Get()
  findAll() {
    return this.sheetService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getSheet(@Param() params) {
    const sheet = await this.sheetService.findOne(params.id);

    if (!sheet) throw new NotFoundException();

    return sheet;
  }

  @UseGuards(JwtAuthGuard)
  @Post('sheets')
  async createOne(@Req() req: Request & { user: User }) {
    try {
      const user = await this.sheetService.createOne({
        sheet: req.body as Partial<typeof Sheet>,
        userId: req.user.id,
      });
      return user;
    } catch (e: unknown) {
      throw new BadRequestException(
        e instanceof ValidationError ? e.errors : null,
      );
    }
  }
}
