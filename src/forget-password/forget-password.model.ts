import {
  Model,
  Table,
  AllowNull,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class ForgetPassword extends Model {
  @AllowNull(false)
  @Column
  token: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
