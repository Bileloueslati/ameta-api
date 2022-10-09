import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddSheetContainerDto } from './dto/add-sheet-container.dto';
import { SheetContainer } from './sheet-container.model';

@Injectable()
export class SheetContainerService {
  constructor(
    @InjectModel(SheetContainer)
    private sheetContainerModel: typeof SheetContainer,
  ) {}

  findAll() {
    return this.sheetContainerModel.findAll();
  }

  create(newSheetDto: AddSheetContainerDto, userId: number) {
    console.log(userId);
    return this.sheetContainerModel.create({ ...newSheetDto, userId });
  }
}
