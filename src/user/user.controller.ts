import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import UserUpdateDto from './dto/userUpdateDto';
import UserCreateDto from './dto/userCreateDto';

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
  async find(@Param('id') id: number) {
    try {
      const user = await this.userService.findOne(id);

      return user;
    } catch (e: unknown) {
      throw new NotFoundException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() user: UserCreateDto) {
    await this.userService.createOne(user);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserUpdateDto,
  ) {
    try {
      await this.userService.updateOne(id, user);
      return { message: 'User successfully updated' };
    } catch (e: unknown) {
      throw new BadRequestException();
    }
  }
}
