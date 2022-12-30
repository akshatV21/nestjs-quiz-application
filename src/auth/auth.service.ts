import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/models/user.model'
import { LoginUserDto } from './dtos/loginUser.dto'
import { RegisterUserDto } from './dtos/registerUser.dto'

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = new this.UserModel(registerUserDto)
  }

  async login(loginUserDto: LoginUserDto) {}
}
