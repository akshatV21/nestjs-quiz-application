import { Controller, Get, Patch } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ReqUser } from 'src/auth/decorators/requser.decorator'
import { UserDocument } from 'src/models/user.model'
import { HttpSuccessResponse } from 'src/utils/types'
import { IUsersController } from './users.interface'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController implements IUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Auth()
  async httpGetCurrentUser(@ReqUser() user: UserDocument): Promise<HttpSuccessResponse> {
    return { success: true, message: 'User fetched successfully', data: { user } }
  }

  @Patch('role')
  @Auth()
  async httpChangeRole(@ReqUser() user: UserDocument): Promise<HttpSuccessResponse> {
    const role = await this.usersService.changeRole(user)
    return { success: true, message: 'User fetched successfully', data: { role } }
  }
}
