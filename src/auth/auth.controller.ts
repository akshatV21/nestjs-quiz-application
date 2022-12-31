import { Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { HttpSuccessResponse } from 'src/utils/types'
import { IAuthController } from './auth.interface'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dtos/loginUser.dto'
import { RegisterUserDto } from './dtos/registerUser.dto'

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async httpRegisterUser(registerUserDto: RegisterUserDto): Promise<HttpSuccessResponse> {
    const user = await this.authService.register(registerUserDto)
    return { success: true, message: 'User registered successfully', data: { user } }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async httpLoginUser(loginUserDto: LoginUserDto): Promise<HttpSuccessResponse> {
    const user = await this.authService.login(loginUserDto)
    return { success: true, message: 'User logged in successfully', data: { user } }
  }

  @Get('validateEmail')
  async httpValidateEmail(@Query('token') token: string): Promise<HttpSuccessResponse> {
    const result = await this.authService.validateEmail(token)
    return { success: true, message: 'Email validation successfully' }
  }
}
