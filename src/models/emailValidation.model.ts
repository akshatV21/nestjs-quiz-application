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

const EmailValidationSchema = SchemaFactory.createForClass(EmailValidation)
EmailValidationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 })

export { EmailValidationSchema }
