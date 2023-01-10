import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { MailerModule } from './mailer/mailer.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://akshat21:aku1985pika@cluster0.ew0oz.mongodb.net/quiz_app?retryWrites=true&w=majority',
    ),
    AuthModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
