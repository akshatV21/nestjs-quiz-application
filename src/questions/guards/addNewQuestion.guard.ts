import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { QuizzesService } from 'src/quizzes/quizzes.service'

@Injectable()
export class AddQuestionGuard implements CanActivate {
  constructor(private readonly quizzesService: QuizzesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user
    const quizId = request.body.quiz
    const quiz = await this.quizzesService.getQuizById(quizId)

    if (!quiz.user.equals(user._id)) throw new ForbiddenException('Cannot access quiz', 'UnauthorisedQuizAccess')
    if (quiz.questions.length >= 20)
      throw new BadRequestException('A quiz cannot have more than 20 questions', 'QuestionsLimitException')

    request.quiz = quiz
    return true
  }
}
