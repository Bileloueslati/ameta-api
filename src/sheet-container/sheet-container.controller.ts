import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { SheetContainerService } from './sheet-container.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddSheetContainerDto } from './dto/add-sheet-container.dto';
import { ValidationError } from 'sequelize';
import User from 'src/decorators/user.decorator';
import { UserPayload } from 'src/auth/jwt.strategy';

@Controller('sheet-containers')
export class SheetContainerController {
  constructor(private readonly sheetContainerService: SheetContainerService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const sheetContainers = await this.sheetContainerService.findAll();

    return sheetContainers;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() sheetDto: AddSheetContainerDto,
    @User() { id }: UserPayload,
  ) {
    try {
      const sheetContainer = await this.sheetContainerService.create(
        sheetDto,
        id,
      );
      return sheetContainer;
    } catch (e: unknown) {
      throw new BadRequestException(
        e instanceof ValidationError
          ? e.errors
          : `Sheet(id: ${sheetDto.sheetId}) does not exist`,
      );
    }
  }
}
