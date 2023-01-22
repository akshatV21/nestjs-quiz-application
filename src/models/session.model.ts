import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { SESSION_STATUSES } from 'src/utils/constants'
import { SessionStatus } from 'src/utils/types'
import { User } from './user.model'

export type SessionDocument = Session & Document

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true, ref: 'Quiz' })
  quiz: Types.ObjectId

  @Prop({ required: true, ref: 'User' })
  organizer: Types.ObjectId

  @Prop({ required: true })
  code: string

  @Prop({ default: [], ref: 'User' })
  participants: User[]

  @Prop({ required: true, ref: 'Statistic' })
  statistic: Types.ObjectId

  @Prop({ default: SESSION_STATUSES[0] })
  status: SessionStatus
}

export const SessionSchema = SchemaFactory.createForClass(Session)
