import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthStorageDTO } from '@storage/auth-storage-dto'
import { AUTH_STORAGE_KEY } from '@storage/storageConfig'

export async function createAuthStorage(input: AuthStorageDTO) {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(input))
  } catch (error) {
    throw error
  }
}
