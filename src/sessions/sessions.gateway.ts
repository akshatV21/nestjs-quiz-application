import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SESSION_EVENTS } from 'src/utils/constants'
import { StartSessionDto } from './dtos/startSession.dto'
import { IsSessionOrganizerGuard } from './guards/isSessionOrganizer.guard'
import { WsSessionsService } from './services/ws-sessions.service'

@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class SessionsGateway {
  constructor(sessionsService: WsSessionsService) {}

  @UseGuards(IsSessionOrganizerGuard)
  @SubscribeMessage(SESSION_EVENTS.START_SESSION)
  async handleStartSessionEvent(@MessageBody() startSessionDto: StartSessionDto) {}
}
