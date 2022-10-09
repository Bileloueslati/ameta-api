import {
  Column,
  Model,
  Table,
  AllowNull,
  HasMany,
  IsIn,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class Compagny extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  country: string;

  @IsIn([[true, false]])
  @Column
  isEnabled: boolean;

  @Column
  logo: string;

  @HasMany(() => User)
  users: User[];
}
