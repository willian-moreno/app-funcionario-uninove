import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProfileConfigDTO } from '@storage/profile-config-dto'
import { PROFILE_CONFIG } from '@storage/storageConfig'

export async function updateProfileConfig(input: ProfileConfigDTO) {
  try {
    await AsyncStorage.setItem(PROFILE_CONFIG, JSON.stringify(input))
  } catch (error) {
    throw error
  }
}
