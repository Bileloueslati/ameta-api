import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { SheetService } from './sheet.service';
import { ValidationError } from 'sequelize';
import { User } from 'src/user/user.model';
import { Sheet } from './sheet.model';
import { PreAuthGuard } from 'src/auth/preAuth.guard';

@UseGuards(PreAuthGuard)
@Controller('sheets')
export class SheetController {
  constructor(private sheetService: SheetService) {}

  @Get()
  findAll() {
    return this.sheetService.findAll();
  }

  @Get('/:id')
  async getSheet(@Param() params) {
    const sheet = await this.sheetService.findOne(params.id);

    if (!sheet) throw new NotFoundException();

    return sheet;
  }

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
