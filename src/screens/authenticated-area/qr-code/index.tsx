import { Bedge } from '@components/bedge'
import { Button } from '@components/button'
import { Footer } from '@components/footer'
import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { ScreenScrollView } from '@components/screen-scroll-view'
import { AuthContext } from '@contexts/auth-context-provider'
import { useAuth } from '@hooks/use-auth'
import ArrowBackOutlined from '@material-symbols/svg-600/outlined/arrow_back.svg'
import NotificationsOutlined from '@material-symbols/svg-600/outlined/notifications.svg'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { fakeQrCode } from '@utils/fake-qr-code'
import { svgCssInterop } from '@utils/svg-css-interop'
import { useCallback, useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { BasicInformations } from './basic-informations'

svgCssInterop([ArrowBackOutlined, NotificationsOutlined])

export function QRCode() {
  const { auth, isLoading: isAuthLoading } = useContext(AuthContext)

  const { signOut } = useAuth()

  const navigation = useNavigation()

  const isBottomSheetActive = useSharedValue(false)

  async function handleGoBack() {
    const canGoBack = navigation.canGoBack()

    if (!canGoBack) {
      await signOut()

      return
    }

    navigation.goBack()
  }

  function handleNavigateToMyProfileScreen() {
    navigation.navigate('my_profile')
  }

  function handleNavigateToNotificationsScreen() {
    navigation.navigate('notifications')
  }

  function handleShowBasicInformations() {
    isBottomSheetActive.set(true)
  }

  useFocusEffect(
    useCallback(() => {
      isBottomSheetActive.set(false)
    }, []),
  )

  if (isAuthLoading) {
    return <Loading />
  }

  return (
    <>
      <ScreenScrollView>
        <View className="flex-1 gap-y-6">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-50 shadow shadow-sky-900/70"
              activeOpacity={0.7}
              onPress={handleGoBack}
            >
              <ArrowBackOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
            </TouchableOpacity>
            <Bedge.Root>
              <TouchableOpacity
                className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-50 shadow shadow-sky-900/70"
                activeOpacity={0.7}
                onPress={handleNavigateToNotificationsScreen}
              >
                <NotificationsOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
              </TouchableOpacity>
              <Bedge.Dot />
            </Bedge.Root>
          </View>

          <Text className="font-sans-bold text-2xl text-sky-900">QR Code</Text>

          <View className="w-full flex-1 items-center gap-y-6">
            <View className="items-center">
              <ProfileButton
                userNameInitials={auth.user.nameInitials}
                size="large"
                onPress={handleNavigateToMyProfileScreen}
              />
              <Text className="mt-2 text-center font-sans-bold text-2xl text-sky-900">
                {auth.user.firstName}
              </Text>
              <Text
                className="text-center font-sans-bold text-lg uppercase text-sky-900/50"
                numberOfLines={2}
              >
                {auth.user.department}
              </Text>
            </View>

            <View className="aspect-square w-[70%] bg-white">
              <Image
                source={{ uri: `data:image/png;base64,${fakeQrCode}` }}
                className="h-full w-full"
              />
            </View>

            <View className="rounded-full bg-sky-900 px-4 py-1">
              <Text className="font-sans-semibold text-xl text-white">
                {auth.user.registration}
              </Text>
            </View>
          </View>

          <View className="gap-y-4">
            <Button
              value="Ver informações"
              variant="secondary"
              onPress={handleShowBasicInformations}
            />
            <Button value="Leitor de QR Code" />
          </View>
        </View>
        <Footer />
      </ScreenScrollView>
      <BasicInformations isVisible={isBottomSheetActive} />
    </>
  )
}
