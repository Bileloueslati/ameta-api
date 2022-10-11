import {
  IsBoolean,
  MinLength,
  IsOptional,
  IsEmail,
  IsNumber,
} from 'class-validator';

export default class UserCreateDto {
  @MinLength(2)
  firstName: string;

  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  compagnyId: number;
}
