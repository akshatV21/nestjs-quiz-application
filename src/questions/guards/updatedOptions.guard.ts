import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { QuizzesService } from 'src/quizzes/quizzes.service'
import { QuestionsService } from '../questions.service'

@Injectable()
export class UpdateOptionsGuard implements CanActivate {
  constructor(private readonly quizzesService: QuizzesService, private readonly questionsService: QuestionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user
    const quizId = request.body.quizId
    const position = Number(request.body.position)
    const questionId = request.body.questionId

    const quiz = await this.quizzesService.getQuizById(quizId)
    const question = await this.questionsService.getQuestionById(questionId)

    if (!quiz.user.equals(user._id)) throw new ForbiddenException('Cannot access quiz', 'UnauthorisedQuizAccess')
    if (!question.quiz.equals(quiz._id))
      throw new ForbiddenException('Unrelatable document ids', 'UnrelatableDocumentIds')
    if (position >= question.options.length)
      throw new BadRequestException(`Position exceeds option's length`, 'OptionsLengthExceedsException')

    request.question = question
    return true
  }
}
