import { IsBoolean, MinLength, IsOptional } from 'class-validator';

export default class UserUpdateDto {
  @IsOptional()
  @MinLength(2)
  firstName: string;

  @IsOptional()
  @MinLength(2)
  lastName: string;

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
