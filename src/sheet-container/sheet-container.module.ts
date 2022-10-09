import { Module } from '@nestjs/common';
import { SheetContainerController } from './sheet-container.controller';
import { SheetContainerService } from './sheet-container.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SheetContainer } from './sheet-container.model';

@Module({
  imports: [SequelizeModule.forFeature([SheetContainer])],
  controllers: [SheetContainerController],
  providers: [SheetContainerService],
})
export class SheetContainerModule {}
