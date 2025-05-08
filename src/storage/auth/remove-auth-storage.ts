import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_STORAGE_KEY } from '@storage/storageConfig'

export async function removeAuthStorage() {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY)
  } catch (error) {
    throw error
  }
}
