export type HttpSuccessResponse = {
  success: boolean
  message: string
  data?: unknown
}

export type AuthOptions = {
  isOpen?: boolean
  user?: boolean
  roles?: string[]
}
