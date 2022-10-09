import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ForgetPassword } from './forget-password.model';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([ForgetPassword])],
  providers: [ForgetPasswordService],
  controllers: [ForgetPasswordController],
  exports: [ForgetPasswordService],
})
export class ForgetPasswordModule {}
