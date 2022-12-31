import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Model } from 'mongoose'
import { MailerService } from 'src/mailer/mailer.service'
import { EmailValidation, EmailValidationDocument } from 'src/models/emailValidation.model'
import { User, UserDocument } from 'src/models/user.model'
import { LoginUserDto } from './dtos/loginUser.dto'
import { RegisterUserDto } from './dtos/registerUser.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectModel(EmailValidation.name) private readonly EmailValidationModel: Model<EmailValidationDocument>,
    private readonly mailerService: MailerService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = new this.UserModel(registerUserDto)

    const validationToken = sign(user.email, user.id)
    const emailValidationDocument = new this.EmailValidationModel({ user: user._id, token: validationToken })

    await Promise.all([user.save(), emailValidationDocument.save()])
    this.mailerService.sendEmailVerificationMail(user.email, validationToken)

    const { password, ...rest } = user._doc
    return rest
  }

  async login(loginUserDto: LoginUserDto) {
    const registeredUser = await this.UserModel.findOne({ username: loginUserDto.username })
    if (!registeredUser) throw new BadRequestException('UsernameNotFound', 'Please provide a registered username.')

    const passwordMatches = compareSync(loginUserDto.password, registeredUser.password)
    if (!passwordMatches) throw new BadRequestException('InvalidPassword', 'Please provide correct password.')

    const token = sign({ id: registeredUser.id }, 'secret', { expiresIn: '24h' })
    const { password, ...rest } = registeredUser._doc

    return { ...rest, token }
  }

  async validateEmail(token: string) {
    const emailValidationDocument = await this.EmailValidationModel.findOne({ token: token })
    if (!emailValidationDocument)
      throw new BadRequestException('InvalidValidationToken', 'Token is either expired or invalid.')

    return true
  }

  async getUserByEmail(email: string) {
    const user = await this.UserModel.findOne({ email: email })
    return user
  }
}
