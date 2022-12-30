import { HttpSuccessResponse } from 'src/utils/types'

export interface IAuthController {
  httpRegisterUser(): Promise<HttpSuccessResponse>
  httpLoginUser(): Promise<HttpSuccessResponse>
}
