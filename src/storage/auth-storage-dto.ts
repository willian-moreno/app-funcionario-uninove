import { User } from '@@types/user'

export type AuthStorageDTO = {
  user: User
  qrCode: string
  accessToken: string
}
