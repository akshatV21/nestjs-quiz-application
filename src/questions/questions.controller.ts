import { Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { HttpSuccessResponse } from 'src/utils/types'
import { AddQuestionDto } from './dtos/addQuestion.dto'
import { IsUserQuizCreator } from './guards/isQuizCreator.guard'
import { IQuestionsController } from './questions.interface'
import { QuestionsService } from './questions.service'

@Controller('questions')
export class QuestionsController implements IQuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Auth({ role: 'creator' })
  @UsePipes(new ValidationPipe())
  @UseGuards(new IsUserQuizCreator())
  async httpAddNewQuestion(newQuestionDto: AddQuestionDto): Promise<HttpSuccessResponse> {
    const question = await this.questionsService.addNew(newQuestionDto)
    return { success: true, message: 'New question added', data: { question } }
  }
}
