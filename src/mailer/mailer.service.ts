import { Injectable } from '@nestjs/common'
import { MailerService as MailService } from '@nestjs-modules/mailer'

@Injectable()
export class MailerService {
  constructor(private mailService: MailService) {}

  async sendEmailVerificationMail(to: string, token: string) {
    await this.mailService.sendMail({ to: to, text: `token = ${token}` })
  }
}
