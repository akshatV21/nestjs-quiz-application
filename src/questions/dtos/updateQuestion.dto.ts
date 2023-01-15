import { IsNotEmpty, IsString } from '@nestjs/class-validator'

export class UpdateQuestionDto {
  @IsNotEmpty()
  @IsString()
  quizId: string

  @IsNotEmpty()
  @IsString()
  questionId: string

  @IsNotEmpty()
  @IsString()
  question: string
}
