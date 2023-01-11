import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { verify } from 'jsonwebtoken'
import { ROLES } from 'src/utils/constants'
import { AuthOptions, Role } from 'src/utils/types'
import { AuthService } from '../auth.service'

@Injectable()
export class Authorize implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { isOpen, role } = this.reflector.get<AuthOptions>('authOptions', context.getHandler())
    if (isOpen) return true

    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.headers['authorization']
    if (!authHeader) throw new UnauthorizedException('Please provide Authorization header', 'NullAuthorizationHeader')

    const token = authHeader.split(' ')[1]
    const { id } = this.validateToken(token)

    const registeredUser = await this.authService.getUserById(id)

    if (!registeredUser.emailValidated) throw new BadRequestException('Please validate your email', 'EmailNotValidated')
    request.user = registeredUser

    if (role === ROLES[0]) return true
    if (role === ROLES[1] && registeredUser.role !== ROLES[1])
      throw new ForbiddenException('You are not a creator', 'UserNotCreator')
    return true
  }

  private validateToken(token: string): any {
    return verify(token, 'secret', (err, payload) => {
      // when jwt is valid
      if (!err) return payload

      // when jwt has expired
      if (err.name === 'TokenExpiredError') throw new UnauthorizedException('Please log in again', 'TokenExpiredError')

      // throws error when jwt is malformed
      throw new UnauthorizedException('Invalid Jwt token', 'InvalidToken')
    })
  }
}
