import { Module } from '@nestjs/common'
import { SessionsService } from './services/sessions.service'
import { SessionsController } from './sessions.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Session, SessionSchema } from 'src/models/session.model'
import { Statistic, StatisticSchema } from 'src/models/statistic.model'
import { User, UserSchema } from 'src/models/user.model'
import { WsSessionsService } from './services/ws-sessions.service'
import { SessionsGateway } from './sessions.gateway'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Statistic.name, schema: StatisticSchema },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService, SessionsGateway, WsSessionsService],
})
export class SessionsModule {}
