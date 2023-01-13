import { UserDocument } from 'src/models/user.model'
import { HttpSuccessResponse } from 'src/utils/types'

export interface IUsersController {
  httpGetCurrentUser(user: UserDocument): Promise<HttpSuccessResponse>
  httpChangeRole(user: UserDocument): Promise<HttpSuccessResponse>
}
