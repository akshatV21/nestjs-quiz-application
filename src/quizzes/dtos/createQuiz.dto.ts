import { IsArray, IsNotEmpty, IsString } from '@nestjs/class-validator'

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsArray()
  categories: string[]
}
