import {
  Controller,
  Get,
  Post,
  Req,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { CompagnyService } from './compagny.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { HasRoles, Role } from '../decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('compagnies')
export class CompagnyController {
  constructor(private compagnyService: CompagnyService) {}

  @Get()
  @HasRoles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Query() query: { page?: number; offset?: number }) {
    try {
      const compagnies = await this.compagnyService.findAll({
        page: Number(query?.page || 1),
        offset: Number(query?.offset || 25),
      });

      return compagnies;
    } catch (e: unknown) {
      throw new BadRequestException(e instanceof Error ? e.message : null);
    }
  }

  @HasRoles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/files',
        filename: (req, file, cb) => {
          const newFileName = `${Date.now()}${path.extname(file.originalname)}`;
          cb(null, newFileName);
        },
      }),
    }),
  )
  async createOne(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const compagny = await this.compagnyService.createOne({
        ...req.body,
        logo: file.filename,
      });
      return compagny;
    } catch (e: any) {
      throw new BadRequestException();
    }
  }
}
