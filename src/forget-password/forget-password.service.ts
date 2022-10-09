import { Injectable } from '@nestjs/common';
import { ForgetPassword } from './forget-password.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';

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
}
