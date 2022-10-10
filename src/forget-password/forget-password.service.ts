import { Injectable } from '@nestjs/common';
import { ForgetPassword } from './forget-password.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import * as dayjs from 'dayjs';

@Injectable()
export class ForgetPasswordService {
  constructor(
    @InjectModel(ForgetPassword)
    private readonly forgePassword: typeof ForgetPassword,
  ) {}

  create(token: string, { id }: User) {
    return this.forgePassword.create({ token, userId: id });
  }

  findOneByToken(token: string): Promise<ForgetPassword & { userId: number }> {
    return this.forgePassword.findOne({
      where: {
        token,
      },
    });
  }

  delete(id: number) {
    return this.forgePassword.destroy({
      where: {
        id,
      },
    });
  }

  hasExpired(req: ForgetPassword): boolean {
    const now = dayjs();

    const { createdAt } = req;

    const expiresAt = dayjs(createdAt).add(30, 'minute');

    return now.isAfter(expiresAt);
  }
}
