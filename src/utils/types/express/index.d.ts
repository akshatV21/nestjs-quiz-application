declare namespace Express {
  import { UserDocument } from 'src/models/user.model'
  export interface Request {
    user: UserDocument
  }
}
