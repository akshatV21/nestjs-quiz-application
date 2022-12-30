import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator'

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
