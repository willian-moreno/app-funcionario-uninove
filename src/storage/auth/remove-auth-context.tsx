import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_CONTEXT } from '@storage/storageConfig'

export async function removeAuthContext() {
  try {
    await AsyncStorage.removeItem(AUTH_CONTEXT)
  } catch (error) {
    throw error
  }
}
