import AsyncStorage from '@react-native-async-storage/async-storage'

import { PROFILE_STORAGE_KEY } from '@storage/storageConfig'

export async function removeProfileStorage() {
  try {
    await AsyncStorage.removeItem(PROFILE_STORAGE_KEY)
  } catch (error) {
    throw error
  }
}
