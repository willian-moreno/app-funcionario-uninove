import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProfileStorageDTO } from '@storage/profile-storage-dto'
import { PROFILE_STORAGE_KEY } from '@storage/storageConfig'

export async function findProfileStorage() {
  try {
    const storage = await AsyncStorage.getItem(PROFILE_STORAGE_KEY)

    if (!storage) {
      return null
    }

    return JSON.parse(storage) as ProfileStorageDTO
  } catch (error) {
    throw error
  }
}
