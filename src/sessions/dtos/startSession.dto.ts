import { IsNotEmpty, IsString } from '@nestjs/class-validator'

export class StartSessionDto {
  @IsNotEmpty()
  @IsString()
  session: string

  @IsNotEmpty()
  @IsString()
  user: string
}
