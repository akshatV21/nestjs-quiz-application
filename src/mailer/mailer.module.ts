import { Module } from '@nestjs/common'
import { MailerService } from './mailer.service'
import { MailerModule as MailModule } from '@nestjs-modules/mailer'

@Module({
  imports: [
    MailModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'a.vishwakarma1021@gmail.com',
          pass: 'plolhahkrrlcpwsw',
        },
      },
      defaults: {
        from: 'a.vishwakarma1021@gmail.com',
        subject: 'No Reply <a.vishwakarma1021@gmail.com>',
      },
    }),
  ],
  controllers: [],
  providers: [MailerService],
})
export class MailerModule {}
