import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContextDTO } from '@storage/auth-context-dto'
import { AUTH_CONTEXT } from '@storage/storageConfig'

export async function findAuthContext() {
  try {
    const storage = await AsyncStorage.getItem(AUTH_CONTEXT)

    if (!storage) {
      return null
    }

    return JSON.parse(storage) as AuthContextDTO
  } catch (error) {
    throw error
  }
}
