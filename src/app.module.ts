import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { MailerModule } from './mailer/mailer.module'
import { QuizzesModule } from './quizzes/quizzes.module'
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    MailerModule,
    QuizzesModule,
    QuestionsModule,
    UsersModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
