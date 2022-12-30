import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { hashSync } from 'bcrypt'
import { Document } from 'mongoose'

export type UserDocument = UserSchema & Document

@Schema({ timestamps: true })
export class UserSchema {
  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string

  _doc: unknown
}

const UserModel = SchemaFactory.createForClass(UserSchema)

UserModel.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  const hashedPassword = hashSync(this.password, 4)
  this.password = hashedPassword
  return next()
})

export { UserModel }
