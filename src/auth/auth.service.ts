import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<typeof User> {
    const user = await this.userService.findOne(email, true);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { isActive, password } = user;

    if (!isActive) {
      throw new UnauthorizedException('Your account is disabled');
    }

    const isPasswordValid = await bcrypt.compare(plainPassword, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user.toJSON();
  }

  async login({ id, firstName, lastName, roles }: User) {
    return {
      token: this.jwtService.sign({ id, roles }),
      firstName,
      lastName,
    };
  }
}
