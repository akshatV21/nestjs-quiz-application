import { Module } from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { QuestionsController } from './questions.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Quiz, QuizSchema } from 'src/models/quiz.model'
import { Question, QuestionSchema } from 'src/models/question.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
