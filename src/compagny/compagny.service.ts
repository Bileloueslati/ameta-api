import { Injectable } from '@nestjs/common';
import { Compagny } from './compagny.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PaginateService, PaginateOptions } from 'nestjs-sequelize-paginate';
import { FindAndCountOptions } from 'sequelize/types';

@Injectable()
export class CompagnyService {
  constructor(
    @InjectModel(Compagny)
    private compagnyModel: typeof Compagny,
    private paginateService: PaginateService,
  ) {}

  createOne(compagny: Partial<Compagny>) {
    return this.compagnyModel.create(compagny);
  }

  findAll(options: PaginateOptions) {
    const queryOptions: FindAndCountOptions = {
      subQuery: false,
      attributes: {
        include: [
          [
            Sequelize.literal(
              '(SELECT COUNT(*) FROM users AS user WHERE user.compagnyId = Compagny.id)',
            ),
            'userCount',
          ],
        ],
      },
    };

    return this.paginateService.findAllPaginate(
      {
        ...options,
        model: Compagny,
        path: '/compagnies',
      },
      queryOptions,
    );
  }
}
