import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Question, QuestionDocument } from 'src/models/question.model'
import { Quiz, QuizDocument } from 'src/models/quiz.model'
import { AddQuestionDto } from './dtos/addQuestion.dto'

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Quiz.name) private readonly QuizModel: Model<QuizDocument>,
    @InjectModel(Question.name) private readonly QuestionModel: Model<QuestionDocument>,
  ) {}

  async addNew(addQuestionDto: AddQuestionDto) {
    const quizId = new Types.ObjectId(addQuestionDto.quiz)
    const quiz = await this.QuizModel.findById(quizId)
    const question = new this.QuestionModel(addQuestionDto)

    question.quiz = quizId
    quiz.questions.push(question._id)

    await Promise.all([quiz.save(), question.save()])
    return question
  }
}
