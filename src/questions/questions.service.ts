import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Question, QuestionDocument } from 'src/models/question.model'
import { Quiz, QuizDocument } from 'src/models/quiz.model'
import { AddQuestionDto } from './dtos/addQuestion.dto'
import { UpdateOptionsDto } from './dtos/updateOptions.dto'
import { UpdateQuestionDto } from './dtos/updateQuestion.dto'

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Quiz.name) private readonly QuizModel: Model<QuizDocument>,
    @InjectModel(Question.name) private readonly QuestionModel: Model<QuestionDocument>,
  ) {}

  async addNew(addQuestionDto: AddQuestionDto, quiz: QuizDocument) {
    const quizId = new Types.ObjectId(addQuestionDto.quiz)
    const question = new this.QuestionModel(addQuestionDto)

    question.quiz = quizId
    quiz.questions.push(question._id)

    await Promise.all([quiz.save(), question.save()])
    return question
  }

  async getAll(quizId: Types.ObjectId) {
    const questions = await this.QuestionModel.find({ quiz: quizId })
    return questions
  }

  async updateQuestion({ question: newQuestion }: UpdateQuestionDto, question: QuestionDocument) {
    question.question = newQuestion
    await question.save()
    return question
  }

  async updateOptions({ option, position }: UpdateOptionsDto, question: QuestionDocument) {
    question.options[position] = option
    await question.save()
    return question
  }

  async getQuestionById(id: string) {
    const question = await this.QuestionModel.findById(id)
    if (!question) throw new BadRequestException('Invalid question id', 'InvalidQuestionId')
    return question
  }
}
