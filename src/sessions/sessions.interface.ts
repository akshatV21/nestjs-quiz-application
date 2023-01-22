import { UserDocument } from 'src/models/user.model'
import { HttpSuccessResponse } from 'src/utils/types'
import { CreateSessionDto } from './dtos/createSession.dto'

export interface ISessionsController {
  httpCreateSession(createSessionDto: CreateSessionDto, user: UserDocument): Promise<HttpSuccessResponse>
}
