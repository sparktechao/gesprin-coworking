import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    return (await super.canActivate(context)) as boolean;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new Error(info.message);
    }
    return user;
  }
}
