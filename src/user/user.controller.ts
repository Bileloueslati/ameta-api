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
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import UserUpdateDto from './dto/userUpdateDto';
import UserCreateDto from './dto/userCreateDto';
import { GateWay } from 'src/gateway/gateway';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly gateWay: GateWay,
  ) {}

  @Get()
  async findAll(@Query() query: { page?: number; offset?: number }) {
    try {
      const users = await this.userService.findAll({
        page: Number(query?.page || 1),
        offset: Number(query?.offset || 25),
      });
      return users;
    } catch (e: unknown) {
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

  @Post()
  async create(@Body() user: UserCreateDto) {
    await this.userService.createOne(user);

    return user;
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserUpdateDto,
  ) {
    try {
      if (user.isActive === false) {
        this.gateWay.server.emit('disabledUser', {
          id,
        });
      }

      await this.userService.updateOne(id, user);
      return { message: 'User successfully updated' };
    } catch (e: unknown) {
      throw new BadRequestException();
    }
  }
}
