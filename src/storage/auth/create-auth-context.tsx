import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContextDTO } from '@storage/auth-context-dto'
import { AUTH_CONTEXT } from '@storage/storageConfig'

export async function createAuthContext(input: AuthContextDTO) {
  try {
    await AsyncStorage.setItem(AUTH_CONTEXT, JSON.stringify(input))
  } catch (error) {
    throw error
  }
}
