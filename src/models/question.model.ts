import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type QuestionDocument = Question & Document

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true, ref: 'Quiz' })
  quiz: Types.ObjectId

  @Prop({ required: true })
  question: string

  @Prop({ required: true, minlength: 4, maxlength: 4 })
  options: string[]

  @Prop({ required: true })
  correct: string
}

export const QuestionSchema = SchemaFactory.createForClass(Question)
