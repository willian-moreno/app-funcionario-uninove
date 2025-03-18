import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { AuthContext } from '@contexts/auth-context-provider'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { Text, View } from 'react-native'

export function Home() {
  const navigation = useNavigation()

  const { auth, isLoading: isScreenLoading } = useContext(AuthContext)

  async function handleNavigateToMyProfileScreen() {
    navigation.navigate('my_profile')
  }

  if (isScreenLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 gap-y-6">
      <View className="flex-row items-center gap-2">
        <ProfileButton
          userNameInitials={auth.user.nameInitials}
          onPress={handleNavigateToMyProfileScreen}
        />
        <Text className="font-sans-bold text-2xl text-sky-900">Olá, {auth.user.firstName}</Text>
      </View>
    </View>
  )
}
