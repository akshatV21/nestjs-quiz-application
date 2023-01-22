import { Types } from 'mongoose'
import { CATEGORIES, ROLES, SESSION_STATUSES } from '../constants'

export type HttpSuccessResponse = {
  success: boolean
  message: string
  data?: unknown
}

export type AuthOptions = {
  isOpen?: boolean
  user?: boolean
  role?: Role
}

export type Role = typeof ROLES[number]

export type Category = typeof CATEGORIES[number]

export type SessionStatus = typeof SESSION_STATUSES[number]

export type Stat = {
  question: Types.ObjectId
  firstOption: Types.ObjectId[]
  secondOption: Types.ObjectId[]
  thirdOption: Types.ObjectId[]
  fourthOption: Types.ObjectId[]
}
