import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthStorageDTO } from '@storage/auth-storage-dto'
import { AUTH_STORAGE_KEY } from '@storage/storageConfig'

export async function findAuthStorage() {
  try {
    const storage = await AsyncStorage.getItem(AUTH_STORAGE_KEY)

    if (!storage) {
      return null
    }

    return JSON.parse(storage) as AuthStorageDTO
  } catch (error) {
    throw error
  }
}
