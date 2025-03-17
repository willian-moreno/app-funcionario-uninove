import { User } from '@@types/user'

export type AuthContextDTO = {
  user: User
  accessToken: string
}
