import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProfileConfigDTO } from '@storage/profile-config-dto'
import { PROFILE_CONFIG } from '@storage/storageConfig'

export async function findProfileConfig() {
  try {
    const storage = await AsyncStorage.getItem(PROFILE_CONFIG)

    if (!storage) {
      return null
    }

    return JSON.parse(storage) as ProfileConfigDTO
  } catch (error) {
    throw error
  }
}
