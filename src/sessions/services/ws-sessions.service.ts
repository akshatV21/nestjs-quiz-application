import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { WsException } from '@nestjs/websockets'
import { Model } from 'mongoose'
import { Session, SessionDocument } from 'src/models/session.model'
import { Statistic, StatisticDocument } from 'src/models/statistic.model'
import { SESSION_STATUSES } from 'src/utils/constants'
import { StartSessionDto } from '../dtos/startSession.dto'
import { Socket } from 'socket.io'

@Injectable()
export class WsSessionsService {
  constructor(
    @InjectModel(Session.name) private readonly SessionModel: Model<SessionDocument>,
    @InjectModel(Statistic.name) private readonly StatsticModel: Model<StatisticDocument>,
  ) {}

  async startSession(startSessionDto: StartSessionDto, client: Socket) {
    const session = await this.SessionModel.findById(startSessionDto.session)
    if (session.status !== SESSION_STATUSES[0])
      throw new WsException({
        error: 'InvalidSessionStatus',
        message: `You cannot start a session with ${session.status} status`,
      })
    session.status = 'ongoing'
    client.join(session.id)
    return session.id
  }
}
