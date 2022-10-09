import { Module } from '@nestjs/common';
import { CompagnyController } from './compagny.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Compagny } from './compagny.model';
import { CompagnyService } from './compagny.service';

@Module({
  imports: [SequelizeModule.forFeature([Compagny])],
  controllers: [CompagnyController],
  providers: [CompagnyService],
})
export class CompagnyModule {}
