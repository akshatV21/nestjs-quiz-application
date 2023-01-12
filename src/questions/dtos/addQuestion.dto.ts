import { IsArray, IsNotEmpty, IsString } from '@nestjs/class-validator'

export class AddQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string

  @IsNotEmpty()
  @IsString()
  quiz: string

  @IsArray()
  options: string[]

  @IsNotEmpty()
  @IsString()
  correct: string
}
