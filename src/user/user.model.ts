import {
  Column,
  Model,
  Table,
  AllowNull,
  IsEmail,
  HasMany,
  Index,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Compagny } from 'src/compagny/compagny.model';
import { Sheet } from 'src/sheet/sheet.model';

@Table
export class User extends Model {
  @AllowNull(false)
  @IsEmail
  @Index({
    unique: true,
  })
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  roles: JSON;

  @Column(DataType.BOOLEAN)
  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Sheet)
  sheets: Sheet[];

  @AllowNull(false)
  @ForeignKey(() => Compagny)
  @Column
  compagnyId: number;

  @BelongsTo(() => Compagny)
  compagny: Compagny;
}
