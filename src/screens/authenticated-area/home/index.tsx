import { ProfileButton } from '@components/profile-button'
import { Text, View } from 'react-native'

export function Home() {
  return (
    <View className="flex-1 gap-y-6">
      <View className="flex-row items-center gap-2">
        <ProfileButton userNameInitials="" onPress={() => {}} />
        <Text className="font-sans-bold text-2xl text-sky-900">Olá,</Text>
      </View>
    </View>
  )
}
