import { User } from '@@types/user'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { findAuthStorage } from '@storage/auth/find-auth-storage'
import { removeAuthStorage } from '@storage/auth/remove-auth-storage'
import { removeProfileStorage } from '@storage/auth/remove-profile-storage'
import { useEffect, useState } from 'react'

type Auth = {
  user: {
    firstName: string
    nameInitials: string
  } & User
  accessToken: string
}

export function useAuth() {
  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(true)

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
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    await removeAuthStorage()
    await removeProfileStorage()

    navigation.navigate('sign_in')
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'sign_in' }],
      }),
    )
  }

  useEffect(() => {
    findStoredAuth()
  }, [])

  return {
    auth,
    isLoading,
    signOut,
  }
}
