import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtOptions } from './constants';

export type UserPayload = {
  id: number;
  roles: ['ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_SUPERADMIN'];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtOptions.secret,
    });
  }

  async validate(payload: UserPayload) {
    return payload;
  }
}
