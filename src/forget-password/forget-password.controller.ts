import {
  Controller,
  Post,
  BadRequestException,
  NotFoundException,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { v4 as generateToken } from '@lukeed/uuid/secure';
import { ForgetPasswordDto } from './dto/forgetPasswordDto';
import { ForgetPasswordService } from './forget-password.service';

@Controller('forget-password')
export class ForgetPasswordController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly forgetPasswordService: ForgetPasswordService,
  ) {}

  @Post()
  async create(@Body() { email }: ForgetPasswordDto) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    try {
      const token = generateToken();

      const resetUrl = `${process.env.FRONT_URL}/reset-password/${token}`;

      await Promise.all([
        this.mailService.sendForgetPassword(user, resetUrl),
        this.forgetPasswordService.create(token, user),
      ]);

      return { user: user.id };
    } catch (e: unknown) {
      throw new BadRequestException(
        e instanceof Error ? e.message : 'unknown error',
      );
    }
  }

  @Get('/:token')
  async find(@Param('token') token: string) {
    const req = await this.forgetPasswordService.findOneByToken(token);

    if (!req) throw new NotFoundException('Token not found');

    const hasExpired = this.forgetPasswordService.hasExpired(req);

    if (hasExpired) {
      await this.forgetPasswordService.delete(req.id);
      throw new NotFoundException('Token has expired');
    }

    return req;
  }
}
