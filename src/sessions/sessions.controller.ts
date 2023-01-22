import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ReqUser } from 'src/auth/decorators/requser.decorator'
import { UserDocument } from 'src/models/user.model'
import { HttpSuccessResponse } from 'src/utils/types'
import { CreateSessionDto } from './dtos/createSession.dto'
import { ISessionsController } from './sessions.interface'
import { SessionsService } from './sessions.service'

@Controller('sessions')
export class SessionsController implements ISessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @Auth({ role: 'creator' })
  @UsePipes(new ValidationPipe())
  async httpCreateSession(
    @Body() createSessionDto: CreateSessionDto,
    @ReqUser() user: UserDocument,
  ): Promise<HttpSuccessResponse> {
    const session = await this.sessionsService.createSession(createSessionDto, user)
    return { success: true, message: 'Session created successfully', data: { session } }
  }
}
