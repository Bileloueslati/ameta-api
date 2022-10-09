import {
  Column,
  Model,
  Table,
  AllowNull,
  IsDate,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { SheetContainer } from 'src/sheet-container/sheet-container.model';
import { User } from 'src/user/user.model';

@Table
export class Sheet extends Model {
  @AllowNull(false)
  @Column
  plate: string;

  @AllowNull(false)
  @Column
  way: string;

  @AllowNull(false)
  @Column
  from: string;

  @AllowNull(false)
  @Column
  to: string;

  @AllowNull(false)
  @IsDate
  @Column
  shipementDate: string;

  @AllowNull(false)
  @Column
  atvylRef: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => SheetContainer)
  sheetContainers: SheetContainer[];
}
