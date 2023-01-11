import { UserDocument } from 'src/models/user.model'
import { HttpSuccessResponse } from 'src/utils/types'
import { CreateQuizDto } from './dtos/createQuiz.dto'

export interface IQuizzesController {
  httpCreateNewQuiz(createQuizDto: CreateQuizDto, user: UserDocument): Promise<HttpSuccessResponse>
}
