import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { Stat } from 'src/utils/types'

@Schema({ timestamps: true })
export class Statistic {
  @Prop({ required: true, ref: 'Session' })
  session: Types.ObjectId

  @Prop({ default: [] })
  timeline: Stat[]
}
