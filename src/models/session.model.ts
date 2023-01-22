import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { SESSION_STATUSES } from 'src/utils/constants'
import { SessionStatus } from 'src/utils/types'
import { User } from './user.model'

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true, ref: 'Quiz' })
  quiz: Types.ObjectId

  @Prop({ required: true, ref: 'User' })
  organizer: Types.ObjectId

  @Prop({ default: '' })
  code: string

  @Prop({ default: [], ref: 'User' })
  participants: User[]

  @Prop({ required: true, ref: 'Statistic' })
  statistic: Types.ObjectId

  @Prop({ default: SESSION_STATUSES[0] })
  status: SessionStatus
}
