import { Request } from 'express'
import { Types } from 'mongoose'
import { HttpSuccessResponse } from 'src/utils/types'
import { AddQuestionDto } from './dtos/addQuestion.dto'
import { UpdateQuestionDto } from './dtos/updateQuestion.dto'

export interface IQuestionsController {
  httpAddNewQuestion(newQuestionDto: AddQuestionDto, req: Request): Promise<HttpSuccessResponse>
  httpGetAllQuestions(quizId: Types.ObjectId): Promise<HttpSuccessResponse>
  httpUpdateQuestion(updateQuestionDto: UpdateQuestionDto): Promise<HttpSuccessResponse>
}
