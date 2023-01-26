import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Types } from 'mongoose'
import { StartSessionDto } from '../dtos/startSession.dto'
import { SessionsService } from '../services/sessions.service'
import { Socket } from 'socket.io'

@Injectable()
export class IsSessionOrganizerGuard implements CanActivate {
  constructor(private readonly sessionsService: SessionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>()
    const { session: sessionId, user } = context.switchToWs().getData<StartSessionDto>()
    const session = await this.sessionsService.getSessionById(sessionId)

    const userObjectId = new Types.ObjectId(user)
    if (!session.organizer.equals(userObjectId))
      throw new WsException({
        error: 'UnauthorizedOrganizer',
        message: 'You are not the authorized organizer of this session',
      })
    return true
  }
}
