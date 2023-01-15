import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ReqUser } from 'src/auth/decorators/requser.decorator'
import { UserDocument } from 'src/models/user.model'
import { HttpSuccessResponse } from 'src/utils/types'
import { CreateQuizDto } from './dtos/createQuiz.dto'
import { IQuizzesController } from './quizzes.interface'
import { QuizzesService } from './quizzes.service'

@Controller('quizzes')
export class QuizzesController implements IQuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @Auth({ role: 'creator' })
  @UsePipes(new ValidationPipe())
  async httpCreateNewQuiz(
    @Body() createQuizDto: CreateQuizDto,
    @ReqUser() user: UserDocument,
  ): Promise<HttpSuccessResponse> {
    const quiz = await this.quizzesService.create(createQuizDto, user)
    return { success: true, message: 'Quiz created successfully', data: { quiz } }
  }

  @Get()
  @Auth()
  async httpGetAllQuizzez(@ReqUser() user: UserDocument): Promise<HttpSuccessResponse> {
    const quizzes = await this.quizzesService.getAllQuizzes(user._id)
    return { success: true, message: 'Fetched quizzes successfully', data: { quizzes } }
  }
}
