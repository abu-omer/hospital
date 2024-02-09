import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService, private userService: UsersService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    console.log('roles', roles)
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers
    if (authorization) {
      const token = authorization.split(' ')[1]
      const decoded = this.jwtService.verify(token)
      const { id } = decoded
      const user = await this.userService.getUser(id)
      console.log(user.roles)

      return roles.includes(user.roles);
    }

    return false
  }
}
