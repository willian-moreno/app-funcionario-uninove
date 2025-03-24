import { Bedge } from '@components/bedge'
import { Footer } from '@components/footer'
import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { ScreenScrollView } from '@components/screen-scroll-view'
import { AuthContext } from '@contexts/auth-context-provider'
import BookOutlined from '@material-symbols/svg-600/outlined/book.svg'
import DentistryOutlined from '@material-symbols/svg-600/outlined/dentistry.svg'
import EmojiLanguageOutlined from '@material-symbols/svg-600/outlined/emoji_language.svg'
import MedicalServicesOutlined from '@material-symbols/svg-600/outlined/medical_services.svg'
import NotificationsOutlined from '@material-symbols/svg-600/outlined/notifications.svg'
import RestaurantOutlined from '@material-symbols/svg-600/outlined/restaurant.svg'
import TheaterComedyOutlined from '@material-symbols/svg-600/outlined/theater_comedy.svg'
import { useNavigation } from '@react-navigation/native'
import { svgCssInterop } from '@utils/svg-css-interop'
import { useContext } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

svgCssInterop([
  BookOutlined,
  DentistryOutlined,
  EmojiLanguageOutlined,
  MedicalServicesOutlined,
  NotificationsOutlined,
  RestaurantOutlined,
  TheaterComedyOutlined,
])

export function Home() {
  const navigation = useNavigation()

  const { auth, isLoading: isScreenLoading } = useContext(AuthContext)

  const benefitsAndServices = [
    { title: 'NotreDame Intermédica', Icon: MedicalServicesOutlined, onPress: () => {} },
    { title: 'Metlife', Icon: DentistryOutlined, onPress: () => {} },
    { title: 'Ticke Edenred', Icon: RestaurantOutlined, onPress: () => {} },
    { title: 'Sesc', Icon: TheaterComedyOutlined, onPress: () => {} },
    { title: 'Voxy', Icon: EmojiLanguageOutlined, onPress: () => {} },
    { title: 'ExLibris', Icon: BookOutlined, onPress: () => {} },
  ]

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
    <ScreenScrollView contentContainerClassName="p-0 py-6">
      <View className="flex-1 gap-y-6">
        <View className="flex-row items-center justify-between gap-x-6 px-6">
          <View className="flex-row items-center gap-x-2">
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
        <View className="gap-y-6">
          <Text className="px-6 font-sans-bold text-2xl text-sky-900">Benefícios e serviços</Text>
          <ScrollView
            contentContainerClassName="gap-x-2 px-6"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {benefitsAndServices.map(({ title, Icon, onPress }, index) => (
              <TouchableOpacity
                key={title}
                className="aspect-square w-40 justify-between gap-y-6 rounded-sm bg-sky-100 p-4"
                activeOpacity={0.7}
                onPress={onPress}
              >
                <Icon className="h-8 w-8 fill-sky-400" />
                <Text className="font-sans-bold text-lg leading-tight text-sky-900">{title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <Footer />
    </ScreenScrollView>
  )
}
