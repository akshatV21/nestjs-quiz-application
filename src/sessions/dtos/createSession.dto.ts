import { IsNotEmpty, IsString } from '@nestjs/class-validator'

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  quiz: string
}
