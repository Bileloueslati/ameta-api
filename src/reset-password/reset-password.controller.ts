import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ForgetPasswordService } from 'src/forget-password/forget-password.service';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDto } from './dto/resetPasswordDto';
import * as bcrypt from 'bcrypt';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(
    private readonly forgetPasswordService: ForgetPasswordService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async reset(@Body() { token, newPassword: plainPassword }: ResetPasswordDto) {
    const req = await this.forgetPasswordService.findOneByToken(token);

    if (!req) throw new BadRequestException('Invalid token');

    const newPassword = await bcrypt.hash(plainPassword, 10);

    await Promise.all([
      this.userService.updateOne(req.userId, {
        password: newPassword,
      }),
      this.forgetPasswordService.delete(req.id),
    ]);

    return { message: 'Password has been successfully changed' };
  }
}
