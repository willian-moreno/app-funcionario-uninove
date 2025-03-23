import { Bedge } from '@components/bedge'
import { Footer } from '@components/footer'
import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { ScreenScrollView } from '@components/screen-scroll-view'
import { AuthContext } from '@contexts/auth-context-provider'
import NotificationsOutlined from '@material-symbols/svg-500/outlined/notifications.svg'
import { useNavigation } from '@react-navigation/native'
import { cssInterop } from 'nativewind'
import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

cssInterop(NotificationsOutlined, {
  className: {
    target: 'style',
    nativeStyleToProp: { width: true, height: true, fill: true },
  },
})

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
            <TouchableOpacity
              className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-100"
              activeOpacity={0.7}
              onPress={handleNavigateToNotificationsScreen}
            >
              <NotificationsOutlined className="h-8 w-8 fill-sky-900" />
            </TouchableOpacity>
            <Bedge.Dot />
          </Bedge.Root>
        </View>
      </View>
      <Footer />
    </ScreenScrollView>
  )
}
