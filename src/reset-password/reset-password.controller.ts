import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { ForgetPasswordService } from 'src/forget-password/forget-password.service';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDto } from './dto/resetPasswordDto';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(
    private readonly forgetPasswordService: ForgetPasswordService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post()
  async reset(@Body() { token, newPassword: plainPassword }: ResetPasswordDto) {
    const req = await this.forgetPasswordService.findOneByToken(token);

    if (!req) throw new BadRequestException('Invalid token');

    const hasExpired = this.forgetPasswordService.hasExpired(req);

    if (hasExpired) {
      await this.forgetPasswordService.delete(req.id);
      throw new BadRequestException('Token has expired');
    }

    const newPassword = await this.userService.hashPassword(plainPassword);

    await Promise.all([
      this.userService.updateOne(req.userId, {
        password: newPassword,
      }),
      this.forgetPasswordService.delete(req.id),
    ]);

    return { message: 'Password has been successfully changed' };
  }
}
