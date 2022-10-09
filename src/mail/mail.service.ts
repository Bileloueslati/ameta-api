import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendForgetPassword(user: User, resetUrl: string) {
    return this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset your password',
      template: 'reset_password',
      context: { user: user.toJSON(), resetUrl },
    });
  }
}
