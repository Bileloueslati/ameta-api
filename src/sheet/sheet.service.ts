import { Injectable } from '@nestjs/common';
import { Sheet } from './sheet.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { SheetContainer } from 'src/sheet-container/sheet-container.model';
import { Compagny } from 'src/compagny/compagny.model';

@Injectable()
export class SheetService {
  constructor(
    @InjectModel(Sheet)
    private sheetModel: typeof Sheet,
  ) {}

  findAll() {
    return this.sheetModel.findAll({
      include: [
        {
          model: User,
          attributes: ['email', 'id', 'firstName', 'lastName'],
        },
      ],
    });
  }

  findOne(id: number | string): Promise<Sheet | undefined> {
    return this.sheetModel.findOne({
      where: { id },
      include: [
        {
          model: SheetContainer,
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
          include: [
            {
              model: Compagny,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
  }

  createOne({
    sheet,
    userId,
  }: {
    sheet: Partial<typeof Sheet>;
    userId: number;
  }) {
    return this.sheetModel.create({
      ...sheet,
      userId,
    });
  }
}
