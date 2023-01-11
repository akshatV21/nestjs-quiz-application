import { Module } from '@nestjs/common'
import { QuizzesService } from './quizzes.service'
import { QuizzesController } from './quizzes.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/models/user.model'
import { Quiz, QuizSchema } from 'src/models/quiz.model'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Quiz.name, schema: QuizSchema }])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
