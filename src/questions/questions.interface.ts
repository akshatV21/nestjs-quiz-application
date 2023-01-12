import { HttpSuccessResponse } from 'src/utils/types'
import { AddQuestionDto } from './dtos/addQuestion.dto'

export interface IQuestionsController {
  httpAddNewQuestion(newQuestionDto: AddQuestionDto): Promise<HttpSuccessResponse>
}
