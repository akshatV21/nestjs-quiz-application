import { Injectable } from '@nestjs/common'
import { UserDocument } from 'src/models/user.model'
import { ROLES } from 'src/utils/constants'

@Injectable()
export class UsersService {
  async changeRole(user: UserDocument) {
    user.role = user.role === ROLES[0] ? ROLES[1] : ROLES[0]
    await user.save()
    return user.role
  }
}
