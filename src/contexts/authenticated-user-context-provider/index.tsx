import { createContext, ReactNode, useState } from 'react'

type AuthenticatedUser = {
  registration: string
  fullName: string
  department: string
  position: string
  campus: string
  dateOfAdmission: string
}

export const AuthenticatedUserContext = createContext({} as AuthenticatedUser)

type Props = {
  children: ReactNode
}

export function AuthenticatedUserContextProvider({ children }: Props) {
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>({
    registration: '020084',
    fullName: 'Willian Alves Moreno',
    department: 'Desenvolvimento',
    position: 'Analista de Sistemas Junior',
    campus: 'Vergueiro',
    dateOfAdmission: '28/03/2022',
  })

  return (
    <AuthenticatedUserContext.Provider value={authenticatedUser}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}
