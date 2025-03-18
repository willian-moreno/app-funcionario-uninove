import { User } from '@@types/user'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { findAuthStorage } from '@storage/auth/find-auth-storage'
import { removeAuthStorage } from '@storage/auth/remove-auth-storage'
import { removeProfileStorage } from '@storage/auth/remove-profile-storage'
import { useEffect, useState } from 'react'

type Auth = { user: User; accessToken: string }

export function useAuth() {
  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(true)

  const [auth, setAuth] = useState<Auth>()

  const firstName = auth?.user.fullName.split(' ')[0] ?? ''

  async function findStoredAuth() {
    try {
      const auth = await findAuthStorage()

      if (!auth) {
        navigation.navigate('sign_in')
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'sign_in' }],
          }),
        )

        return
      }

      setAuth(auth)
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
    auth: { ...auth, user: { ...auth?.user, firstName } },
    isLoading,
    signOut,
  }
}
