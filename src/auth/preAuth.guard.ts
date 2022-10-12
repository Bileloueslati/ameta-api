import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PreAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const user = request.user as User | undefined;

    if (!user) {
      return true;
    }

    const { isActive } = await this.userService.isActive(user.id);

    if (!isActive) {
      throw new UnauthorizedException('User is disabled');
    }
    return true;
  }
}
