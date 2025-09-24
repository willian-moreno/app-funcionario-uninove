import { useCallback } from 'react'

import { CommonActions, useNavigation } from '@react-navigation/native'

import { removeAuthStorage } from '@storage/auth/remove-auth-storage'
import { removeProfileStorage } from '@storage/auth/remove-profile-storage'

export function useAuth() {
  const navigation = useNavigation()

  const signOut = useCallback(async () => {
    await removeAuthStorage()
    await removeProfileStorage()

    navigation.navigate('sign_in')
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'sign_in' }],
      }),
    )
  }, [navigation])

  return {
    signOut,
  }
}
