import {
  Column,
  Model,
  Table,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Sheet } from 'src/sheet/sheet.model';
import { User } from 'src/user/user.model';

@Table
export class SheetContainer extends Model {
  @AllowNull(false)
  @Column
  sender: string;

  @AllowNull(false)
  @Column
  consignee: string;

  @AllowNull(false)
  @Column
  packaging: number;

  @AllowNull(false)
  @Column
  volumem3: number;

  @AllowNull(false)
  @Column
  delTerms: string;

  @ForeignKey(() => Sheet)
  @AllowNull(false)
  @Column
  sheetId: number;

  @BelongsTo(() => Sheet)
  sheet: Sheet;

  @AllowNull(false)
  @Column
  weight: number;

  @AllowNull(false)
  @Column
  delivery: string;

  @AllowNull(false)
  @Column
  atvylCosts: number;

  @AllowNull(false)
  @Column
  atvylIncomes: number;

  @AllowNull(false)
  @Column
  lusocargoCosts: number;

  @AllowNull(false)
  @Column
  lusocargoIncomes: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  createdBy: User;
}
