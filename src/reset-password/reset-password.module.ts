import { Module } from '@nestjs/common';
import { ForgetPasswordModule } from 'src/forget-password/forget-password.module';
import { UserModule } from 'src/user/user.module';
import { ResetPasswordController } from './reset-password.controller';

@Module({
  imports: [ForgetPasswordModule, UserModule],
  controllers: [ResetPasswordController],
})
export class ResetPasswordModule {}
