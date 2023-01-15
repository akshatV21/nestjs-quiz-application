declare namespace Express {
  import { UserDocument } from 'src/models/user.model'
  import { QuizDocument } from 'src/models/quiz.model'
  export interface Request {
    user: UserDocument
    quiz: QuizDocument
  }
}
