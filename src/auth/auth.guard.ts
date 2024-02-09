import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {

      const request = context.switchToHttp().getRequest()
      const { authorization } = request.headers
      let token
      if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1]
        if (!token) {
          throw new UnauthorizedException('please login')
        }
        const decoded = await this.authService.validateToken(token)
        console.log(decoded)
        return true
      }
    } catch (error) {
      throw new ForbiddenException(error.message || 'session expired! Please sign In');
    }
    return false;
  }
}
