import { ROLES } from '../constants'

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
