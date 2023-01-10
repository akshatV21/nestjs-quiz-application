import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { HttpSuccessResponse } from 'src/utils/types'
import { IAuthController } from './auth.interface'
import { AuthService } from './auth.service'
import { Auth } from './decorators/auth.decorator'
import { LoginUserDto } from './dtos/loginUser.dto'
import { RegisterUserDto } from './dtos/registerUser.dto'

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth({ isOpen: true })
  @UsePipes(new ValidationPipe())
  async httpRegisterUser(@Body() registerUserDto: RegisterUserDto): Promise<HttpSuccessResponse> {
    const user = await this.authService.register(registerUserDto)
    return { success: true, message: 'User registered successfully', data: { user } }
  }

  @Post('login')
  @Auth({ isOpen: true })
  @UsePipes(new ValidationPipe())
  async httpLoginUser(@Body() loginUserDto: LoginUserDto): Promise<HttpSuccessResponse> {
    const user = await this.authService.login(loginUserDto)
    return { success: true, message: 'User logged in successfully', data: { user } }
  }

  @Get('validateEmail')
  @Auth({ isOpen: true })
  async httpValidateEmail(@Query('token') token: string): Promise<HttpSuccessResponse> {
    const result = await this.authService.validateEmail(token)
    return { success: true, message: 'Email validation successfully' }
  }
}
