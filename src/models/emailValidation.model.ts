import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type EmailValidationDocument = EmailValidation & Document

@Schema({ timestamps: true })
export class EmailValidation {
  @Prop({ required: true, ref: 'User' })
  user: Types.ObjectId

  @Prop({ required: true })
  token: string
}

export const EmailValidationSchema = SchemaFactory.createForClass(EmailValidation)
