import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Stat } from 'src/utils/types'

export type StatisticDocument = Statistic & Document

@Schema({ timestamps: true })
export class Statistic {
  @Prop({ required: true, ref: 'Session' })
  session: Types.ObjectId

  @Prop({ default: [] })
  timeline: Stat[]
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic)
