import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthService } from '../auth.service'

@Injectable()
export class EmailAlreadyExistsGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const email = request.body.email

    const user = await this.authService.getUserByEmail(email)
    if (user) throw new BadRequestException('EmailAlreadyExists', 'Please provide a unique email.')

    return true
  }
}
