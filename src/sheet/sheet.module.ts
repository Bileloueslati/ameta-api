import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { SheetController } from './sheet.controller';
import { SheetService } from './sheet.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sheet } from './sheet.model';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([Sheet])],
  controllers: [SheetController],
  providers: [SheetService],
})
export class SheetModule {}
