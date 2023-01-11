import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Category } from 'src/utils/types'
import { Question } from './question.model'

export type QuizDocument = Quiz & Document

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true, ref: 'User' })
  user: Types.ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  categories: Category[]

  @Prop({ default: [], ref: 'Question' })
  questions: Question[]
}

export const QuizSchema = SchemaFactory.createForClass(Quiz)
