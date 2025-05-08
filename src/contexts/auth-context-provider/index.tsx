import { createContext, ReactNode, useState } from 'react'

import { User } from '@@types/user'

import { useAuth } from '@hooks/use-auth'

import { findAuthStorage } from '@storage/auth/find-auth-storage'

type Auth = {
  user: {
    firstName: string
    nameInitials: string
  } & User
  qrCode: string
  accessToken: string
}

type AuthContextType = {
  auth: Auth
  findStoredAuth: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

type Props = {
  children: ReactNode
}

export function AuthContextProvider({ children }: Props) {
  const { signOut } = useAuth()

  const [auth, setAuth] = useState<Auth>()

  async function findStoredAuth() {
    try {
      const auth = await findAuthStorage()

      if (!auth) {
        await signOut()

        return
      }

      const firstUserName = auth?.user.fullName.split(' ')[0] ?? ''

      const userNameInitials = auth?.user.fullName
        .split(' ')
        .slice(0, 2)
        .map((name) => name.charAt(0).toLocaleUpperCase())
        .join('')

      setAuth({
        ...auth,
        user: {
          ...auth.user,
          firstName: firstUserName,
          nameInitials: userNameInitials,
        },
      })
    } catch (error) {}
  }

  return (
    <AuthContext.Provider
      value={{
        auth: auth!,
        findStoredAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
