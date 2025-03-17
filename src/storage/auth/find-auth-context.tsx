import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_CONTEXT } from '@storage/storageConfig'

export async function findAuthContext() {
  try {
    const storage = await AsyncStorage.getItem(AUTH_CONTEXT)

    if (!storage) {
      return null
    }

    return JSON.parse(storage)
  } catch (error) {
    throw error
  }
}
