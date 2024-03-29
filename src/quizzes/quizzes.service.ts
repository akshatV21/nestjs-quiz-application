import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Quiz, QuizDocument } from 'src/models/quiz.model'
import { UserDocument } from 'src/models/user.model'
import { CreateQuizDto } from './dtos/createQuiz.dto'

@Injectable()
export class QuizzesService {
  constructor(@InjectModel(Quiz.name) private readonly QuizModel: Model<QuizDocument>) {}

  async create(createQuizDto: CreateQuizDto, user: UserDocument) {
    const quiz = new this.QuizModel({ ...createQuizDto, user: user._id })
    user.quizzes.push(quiz._id)

    await Promise.all([quiz.save(), user.save()])
    return quiz
  }

  async getAllQuizzes(userId: string) {
    const quizzezs = await this.QuizModel.find({ user: userId })
    return quizzezs
  }

  async getQuizById(id: string) {
    const quiz = await this.QuizModel.findById(id)
    if (!quiz) throw new BadRequestException('Invalid quiz id', 'InvalidQuizId')
    return quiz
  }
}
