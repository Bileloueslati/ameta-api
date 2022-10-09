import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { ValidationError } from 'sequelize';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: { page?: number; offset?: number }) {
    try {
      const users = await this.userService.findAll({
        page: Number(query?.page || 1),
        offset: Number(query?.offset || 25),
      });
      return users;
    } catch (e: unknown) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    try {
      const user = await this.userService.findOne(id);

      return user;
    } catch (e: unknown) {
      throw new NotFoundException();
    }
  }

  @Post()
  async createOne(@Req() req: Request) {
    try {
      const data = req.body as Partial<User>;

      const { email, password } = data;

      if (!email || !password)
        throw new BadRequestException('Email and password are required');

      const user = await this.userService.createOne(data);

      return user;
    } catch (e: unknown) {
      throw new BadRequestException(
        e instanceof ValidationError
          ? e.errors
          : e instanceof BadRequestException
          ? e.message
          : null,
      );
    }
  }

  @Put('/:id')
  async edit(@Req() req: Request, @Param('id') id: number) {
    try {
      const user = await this.userService.updateOne(
        id,
        req.body as Partial<User>,
      );
      return user;
    } catch (e: unknown) {
      throw new BadRequestException();
    }
  }
}
