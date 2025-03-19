import { Bedge } from '@components/bedge'
import { Footer } from '@components/footer'
import { IconButton } from '@components/icon-button'
import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { ScreenScrollView } from '@components/screen-scroll-view'
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

  function handleNavigateToNotificationsScreen() {
    navigation.navigate('notifications')
  }

  if (isScreenLoading) {
    return <Loading />
  }

  return (
    <ScreenScrollView>
      <View className="flex-1 gap-y-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <ProfileButton
              userNameInitials={auth.user.nameInitials}
              onPress={handleNavigateToMyProfileScreen}
            />
            <Text className="font-sans-bold text-2xl text-sky-900">Olá, {auth.user.firstName}</Text>
          </View>
          <Bedge.Root>
            <IconButton
              icon="notifications-outline"
              onPress={handleNavigateToNotificationsScreen}
            />
            <Bedge.Dot />
          </Bedge.Root>
        </View>
      </View>
      <Footer />
    </ScreenScrollView>
  )
}
