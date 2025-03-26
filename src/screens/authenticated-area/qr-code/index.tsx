import { Bedge } from '@components/bedge'
import { BottomSheet } from '@components/bottom-sheet'
import { Button } from '@components/button'
import { Footer } from '@components/footer'
import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { ScreenScrollView } from '@components/screen-scroll-view'
import { Separator } from '@components/separator'
import { AuthContext } from '@contexts/auth-context-provider'
import { useAuth } from '@hooks/use-auth'
import ArrowBackOutlined from '@material-symbols/svg-600/outlined/arrow_back.svg'
import BadgeOutlined from '@material-symbols/svg-600/outlined/badge.svg'
import CakeOutlined from '@material-symbols/svg-600/outlined/cake.svg'
import CloseOutlined from '@material-symbols/svg-600/outlined/close.svg'
import FlagOutlined from '@material-symbols/svg-600/outlined/flag.svg'
import NotificationsOutlined from '@material-symbols/svg-600/outlined/notifications.svg'
import PersonOutlined from '@material-symbols/svg-600/outlined/person.svg'
import SchoolOutlined from '@material-symbols/svg-600/outlined/school.svg'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { fakeQrCode } from '@utils/fake-qr-code'
import { DEFAULT_DATE, formatDateToLocale } from '@utils/format-date-to-locale'
import { svgCssInterop } from '@utils/svg-css-interop'
import { formatDuration, intervalToDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useCallback, useContext } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

svgCssInterop([
  ArrowBackOutlined,
  BadgeOutlined,
  CakeOutlined,
  CloseOutlined,
  FlagOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SchoolOutlined,
])

export function QRCode() {
  const { auth, isLoading: isAuthLoading } = useContext(AuthContext)

  const { signOut } = useAuth()

  const navigation = useNavigation()

  const isBottomSheetActive = useSharedValue(false)

  const intervalBetweenDateOfAdmissionAndNow = intervalToDuration({
    start: auth.user.dateOfAdmission,
    end: new Date(),
  })

  const distanceBetweenDateOfAdmissionAndNow = formatDuration(
    intervalBetweenDateOfAdmissionAndNow,
    {
      locale: ptBR,
      format: ['years', 'months'],
    },
  )

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

  function onBottomSheetVisibilityChange() {
    isBottomSheetActive.set(false)
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
      <BottomSheet isVisible={isBottomSheetActive} onClose={onBottomSheetVisibilityChange}>
        <View className="flex-1 gap-y-6 px-6 pt-6">
          <View className="gap-y-2">
            <View className="flex-row justify-between gap-x-6">
              <Text
                className="my-auto flex-1 font-sans-bold text-2xl text-sky-900"
                numberOfLines={2}
              >
                Informações básicas
              </Text>
              <TouchableOpacity
                className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-50 shadow shadow-sky-900/70"
                activeOpacity={0.7}
                onPress={onBottomSheetVisibilityChange}
              >
                <CloseOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            className="gap-y-6"
            contentContainerClassName="flex-grow gap-y-6 pb-6"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row items-center gap-x-6">
              <PersonOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
              <View>
                <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">
                  Nome completo
                </Text>
                <Text className="font-sans-bold text-lg text-sky-900">{auth.user.fullName}</Text>
              </View>
            </View>
            <Separator orientation="horizontal" />
            <View className="flex-row items-center gap-x-6">
              <SchoolOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
              <View>
                <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">Campus</Text>
                <Text className="font-sans-bold text-lg text-sky-900">{auth.user.campus}</Text>
              </View>
            </View>
            <Separator orientation="horizontal" />
            <View className="flex-row items-center gap-x-6">
              <FlagOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
              <View>
                <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">Setor</Text>
                <Text className="font-sans-bold text-lg text-sky-900">{auth.user.department}</Text>
              </View>
            </View>
            <Separator orientation="horizontal" />
            <View className="flex-row items-center gap-x-6">
              <BadgeOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
              <View>
                <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">Cargo</Text>
                <Text className="font-sans-bold text-lg text-sky-900">{auth.user.position}</Text>
              </View>
            </View>
            <Separator orientation="horizontal" />
            <View className="flex-row items-center gap-x-6">
              <CakeOutlined className="pointer-events-none h-8 w-8 fill-sky-400" />
              <View>
                <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">
                  Data de admissão
                </Text>
                <Text className="font-sans-bold text-lg text-sky-900">
                  {formatDateToLocale(auth.user.dateOfAdmission, DEFAULT_DATE)}
                </Text>
                {distanceBetweenDateOfAdmissionAndNow.length > 0 && (
                  <Text className="font-sans-bold text-sm uppercase text-sky-700">
                    {distanceBetweenDateOfAdmissionAndNow}
                  </Text>
                )}
              </View>
            </View>
            <Separator orientation="horizontal" />
            <Text className="font-sans-regular text-xl text-sky-900">
              Caso haja divergência em algum dado, entre em contato com o RH.{' '}
            </Text>
          </ScrollView>
        </View>
      </BottomSheet>
    </>
  )
}
