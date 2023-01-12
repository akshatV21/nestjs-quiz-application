import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { QuizzesService } from 'src/quizzes/quizzes.service'

@Injectable()
export class IsUserQuizCreator implements CanActivate {
  constructor(private readonly quizzesService: QuizzesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user
    const quizId = request.body.quiz
    const quiz = await this.quizzesService.getQuizById(quizId)

    if (quiz.user !== user._id) throw new ForbiddenException('Cannot access quiz', 'UnauthorisedQuizAccess')
    return true
  }
}
