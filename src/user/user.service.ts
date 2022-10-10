import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { Compagny } from 'src/compagny/compagny.model';
import { PaginateService, PaginateOptions } from 'nestjs-sequelize-paginate';
import { FindAndCountOptions } from 'sequelize/types';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private paginateService: PaginateService,
  ) {}

  /**
   * @param identifier : Email or ID
   */
  findOne(
    identifier: string | number,
    includePassword = false,
  ): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { id: identifier }],
      },
      attributes: { exclude: includePassword ? [] : ['password'] },
      include: [{ model: Compagny, attributes: ['name', 'id'] }],
    });
  }

  async createOne(data: Partial<User>) {
    const { password: plainPassword } = data;

    const password = await this.hashPassword(plainPassword);

    return this.userModel.create({ ...data, password });
  }

  findAll(options: PaginateOptions): Promise<any> {
    const queryOptions: FindAndCountOptions = {
      attributes: { exclude: ['password', 'compagnyId'] },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Compagny,
          attributes: ['id', 'name', 'logo'],
        },
      ],
    };

    const paginate = this.paginateService.findAllPaginate(
      {
        ...options,
        model: User,
        path: '/users',
      },
      queryOptions,
    );

    return paginate;
  }

  updateOne(id: number, data: Partial<User>) {
    return this.userModel.update(data, {
      where: { id },
    });
  }

  hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, 10);
  }
}
