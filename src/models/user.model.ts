import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { hashSync } from 'bcrypt'
import { Document } from 'mongoose'
import { ROLES } from 'src/utils/constants'
import { Role } from 'src/utils/types'
import { Quiz } from './quiz.model'
import { SessionDocument } from './session.model'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: false })
  emailValidated: boolean

  @Prop({ default: ROLES[0] })
  role: Role

  @Prop({ default: [], ref: 'Quiz' })
  quizzes: Quiz[]

  @Prop({ default: [], ref: 'Session' })
  sessions: SessionDocument[]

  _doc: any
}

const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  const hashedPassword = hashSync(this.password, 4)
  this.password = hashedPassword
  return next()
})

export { UserSchema }
