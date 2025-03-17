type User = {
  registration: string
  fullName: string
  department: string
  position: string
  campus: string
  dateOfAdmission: string
}

export type AuthContextDTO = {
  user: User
  accessToken: string
}
