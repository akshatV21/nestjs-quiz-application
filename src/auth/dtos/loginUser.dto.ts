import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator'

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}
