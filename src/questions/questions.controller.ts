import { Body, Controller, Get, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { Request } from 'express'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ParseObjectId } from 'src/utils/pipes/objectId.pipe'
import { HttpSuccessResponse } from 'src/utils/types'
import { AddQuestionDto } from './dtos/addQuestion.dto'
import { UpdateQuestionDto } from './dtos/updateQuestion.dto'
import { AddQuestionGuard } from './guards/addNewQuestion.guard'
import { UpdateQuestionGuard } from './guards/updateQuestion.guard'
import { IQuestionsController } from './questions.interface'
import { QuestionsService } from './questions.service'

@Controller('questions')
export class QuestionsController implements IQuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Auth({ role: 'creator' })
  @UsePipes(new ValidationPipe())
  @UseGuards(AddQuestionGuard)
  async httpAddNewQuestion(@Body() newQuestionDto: AddQuestionDto, @Req() req: Request): Promise<HttpSuccessResponse> {
    const question = await this.questionsService.addNew(newQuestionDto, req.quiz)
    return { success: true, message: 'New question added', data: { question } }
  }

  @Get()
  @Auth()
  async httpGetAllQuestions(@Query('quizId', ParseObjectId) quizId: Types.ObjectId): Promise<HttpSuccessResponse> {
    const questions = await this.questionsService.getAll(quizId)
    return { success: true, message: 'Fetched questions successfully', data: { questions } }
  }

  @Patch('question')
  @Auth({ role: 'creator' })
  @UsePipes(new ValidationPipe())
  @UseGuards(UpdateQuestionGuard)
  async httpUpdateQuestion(@Body() updateQuestionDto: UpdateQuestionDto): Promise<HttpSuccessResponse> {
    const question = await this.questionsService.updateQuestion(updateQuestionDto)
    return { success: true, message: 'Question updated successfully', data: { question } }
  }
}
