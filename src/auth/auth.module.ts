import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/models/user.model'
import { EmailValidation, EmailValidationSchema } from 'src/models/emailValidation.model'
import { MailerService } from 'src/mailer/mailer.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: EmailValidation.name, schema: EmailValidationSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailerService],
})
export class AuthModule {}
