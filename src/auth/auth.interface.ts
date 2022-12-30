import { HttpSuccessResponse } from 'src/utils/types'
import { LoginUserDto } from './dtos/loginUser.dto'
import { RegisterUserDto } from './dtos/registerUser.dto'

export interface IAuthController {
  httpRegisterUser(registerUserDto: RegisterUserDto): Promise<HttpSuccessResponse>
  httpLoginUser(loginUserDto: LoginUserDto): Promise<HttpSuccessResponse>
  // httpValidateEmail(): Promise<HttpSuccessResponse>
}
