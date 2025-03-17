import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProfileStorageDTO } from '@storage/profile-storage-dto'
import { PROFILE_STORAGE_KEY } from '@storage/storageConfig'

export async function updateProfileStorage(input: ProfileStorageDTO) {
  try {
    await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(input))
  } catch (error) {
    throw error
  }
}
