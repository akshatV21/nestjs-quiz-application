import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator'

export class UpdateOptionsDto {
  @IsNotEmpty()
  @IsString()
  quizId: string

  @IsNotEmpty()
  @IsString()
  questionId: string

  @IsNotEmpty()
  @IsString()
  option: string

  @IsNotEmpty()
  @IsNumber()
  position: number
}
