import AsyncStorage from '@react-native-async-storage/async-storage'
import { PROFILE_CONFIG } from '@storage/storageConfig'

export async function removeProfileConfig() {
  try {
    await AsyncStorage.removeItem(PROFILE_CONFIG)
  } catch (error) {
    throw error
  }
}
