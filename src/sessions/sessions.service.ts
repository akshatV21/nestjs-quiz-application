import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Session, SessionDocument } from 'src/models/session.model'
import { Statistic, StatisticDocument } from 'src/models/statistic.model'
import { UserDocument } from 'src/models/user.model'
import { generate4DigitCode } from 'src/utils/functions'
import { CreateSessionDto } from './dtos/createSession.dto'

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private readonly SessionModel: Model<SessionDocument>,
    @InjectModel(Statistic.name) private readonly StatsticModel: Model<StatisticDocument>,
  ) {}

  async createSession(createSessionDto: CreateSessionDto, user: UserDocument) {
    const quizId = new Types.ObjectId(createSessionDto.quiz)
    const session = new this.SessionModel({ quiz: quizId, organizer: user._id, code: generate4DigitCode() })
    const statistic = new this.StatsticModel({ session: session._id })

    session.statistic = statistic._id
    user.sessions.push(session._id)

    await Promise.all([session.save(), statistic.save(), user.save()])
    return session
  }
}
