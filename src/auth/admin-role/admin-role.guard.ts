import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Category } from 'src/users/schemas/User.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UsersService, private jwtService: JwtService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers
    if (authorization) {
      const token = authorization.split(' ')[1]
      const decoded = this.jwtService.verify(token)
      const { id } = decoded
      const user = await this.userService.getUser(id)

      return user.roles === 'admin'
    }

    return false;
  }
}
