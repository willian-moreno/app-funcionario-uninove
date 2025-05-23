import { useCallback, useContext, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import ArrowBackOutlined from '@material-symbols/svg-600/outlined/arrow_back.svg'
import ChevronRightOutlined from '@material-symbols/svg-600/outlined/chevron_right.svg'
import NotificationsOutlined from '@material-symbols/svg-600/outlined/notifications.svg'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { AnchorButton } from '@components/anchor-button'
import { Bedge } from '@components/bedge'
import { FingerprintValidation } from '@components/fingerprint-validation'
import { Footer } from '@components/footer'
import { ProfileButton } from '@components/profile-button'
import { ScreenScrollView } from '@components/screen-scroll-view'
import { Separator } from '@components/separator'
import { SwitchButton } from '@components/switch-button'

import { AuthContext } from '@contexts/auth-context-provider'

import { useAuth } from '@hooks/use-auth'
import { useBiometrics } from '@hooks/use-biometrics'

import { findProfileStorage } from '@storage/auth/find-profile-storage'
import { updateProfileStorage } from '@storage/auth/update-profile-storage'

import { svgCssInterop } from '@utils/svg-css-interop'

import { TermsAndConditions } from './terms-and-conditions'

svgCssInterop([ArrowBackOutlined, ChevronRightOutlined, NotificationsOutlined])

type Profile = {
  isBiometricActive: boolean
  isNewAnnouncementsActive: boolean
  isNewNotificationsActive: boolean
}

export function MyProfile() {
  const { auth } = useContext(AuthContext)

  const { signOut } = useAuth()

  const navigation = useNavigation()

  const { isFingerprintAvailable, isBiometricEnrolled } = useBiometrics()

  const isTermsAndConditionsBottomSheetActive = useSharedValue(false)

  const [isFingerprintSignInVisible, setIsFingerprintSignInVisible] = useState(false)

  const [profile, setProfile] = useState<Profile>({
    isBiometricActive: false,
    isNewAnnouncementsActive: false,
    isNewNotificationsActive: false,
  })

  const isBiometricActive = profile.isBiometricActive && isFingerprintAvailable
  const isNewAnnouncementsActive = profile.isNewAnnouncementsActive
  const isNewNotificationsActive = profile.isNewNotificationsActive

  async function handleGoBack() {
    const canGoBack = navigation.canGoBack()

    if (!canGoBack) {
      await signOut()

      return
    }

    navigation.goBack()
  }

  function handleNavigateToNotificationsScreen() {
    navigation.navigate('notifications')
  }

  async function findStoredProfile() {
    try {
      const profile = await findProfileStorage()

      if (!profile) {
        setProfile({
          isBiometricActive: false,
          isNewAnnouncementsActive: false,
          isNewNotificationsActive: false,
        })

        return
      }

      setProfile(profile)
    } catch (error) {}
  }

  async function handleShowFingerprintValidation(isActive: boolean) {
    if (!isActive) {
      await handleUpdateBiometric(false)
      return
    }

    if (!isBiometricEnrolled) {
      Alert.alert('Autenticação', 'Nenhuma biometria cadastrada no dispositivo.')

      return
    }

    setIsFingerprintSignInVisible(true)
  }

  async function handleEnableBiometric() {
    await handleUpdateBiometric(true)
    setIsFingerprintSignInVisible(false)
  }

  async function handleUpdateBiometric(isActive: boolean) {
    try {
      setProfile((state) => ({ ...state, isBiometricActive: isActive }))
      await updateProfileStorage({ ...profile, isBiometricActive: isActive })
    } catch (error) {
    } finally {
      await findStoredProfile()
    }
  }

  async function handleToggleNewAnnouncements(isActive: boolean) {
    try {
      setProfile((state) => ({ ...state, isNewAnnouncementsActive: isActive }))
      await updateProfileStorage({ ...profile, isNewAnnouncementsActive: isActive })
    } catch (error) {
    } finally {
      await findStoredProfile()
    }
  }

  async function handleToggleNewNotifications(isActive: boolean) {
    try {
      setProfile((state) => ({ ...state, isNewNotificationsActive: isActive }))
      await updateProfileStorage({ ...profile, isNewNotificationsActive: isActive })
    } catch (error) {
    } finally {
      await findStoredProfile()
    }
  }

  function handleShowTermsAndConditions() {
    isTermsAndConditionsBottomSheetActive.set(true)
  }

  async function handleSignOut() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair da conta? Ao sair você retornará para a tela de login.',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            signOut()
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    )
  }

  useFocusEffect(
    useCallback(() => {
      isTermsAndConditionsBottomSheetActive.set(false)
      findStoredProfile()
    }, []),
  )

  return (
    <>
      {isFingerprintSignInVisible && <FingerprintValidation onSuccess={handleEnableBiometric} />}
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

          <Text className="font-sans-bold text-2xl text-sky-900">Meu perfil</Text>

          <View className="flex-row items-center gap-x-4">
            <ProfileButton
              userNameInitials={auth?.user.nameInitials}
              disabled
            />
            <View className="flex-1">
              <Text
                className="font-sans-bold text-lg leading-tight text-sky-900"
                numberOfLines={1}
              >
                {auth?.user.fullName}
              </Text>
              <Text className="font-sans-regular text-lg leading-tight text-sky-900">
                {auth?.user.registration}
              </Text>
            </View>
          </View>

          <Separator orientation="horizontal" />

          <View className="gap-y-6">
            <View className="gap-y-2">
              <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">
                Segurança
              </Text>
              <Text className="font-sans-semibold text-xl text-sky-900">
                Configure a segurança da sua conta
              </Text>
            </View>

            <View className="flex-row flex-nowrap items-center justify-between gap-x-4">
              <Text className="flex-1 font-sans-regular text-xl text-sky-900">
                Usar biometria para desbloquear o app e acessar a conta
              </Text>
              <SwitchButton
                value={isBiometricActive}
                disabled={!isFingerprintAvailable}
                onChangeValue={handleShowFingerprintValidation}
              />
            </View>
          </View>

          <Separator orientation="horizontal" />

          <View className="gap-y-6">
            <View className="gap-y-2">
              <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">
                Comunicação
              </Text>
              <Text className="font-sans-semibold text-xl text-sky-900">
                Escolha o tipo de comunicação que você quer receber no seu dispositivo móvel
              </Text>
            </View>

            <View className="flex-row flex-nowrap items-center justify-between gap-x-4">
              <Text className="flex-1 font-sans-regular text-xl text-sky-900">
                Comunicados novos
              </Text>
              <SwitchButton
                value={isNewAnnouncementsActive}
                onChangeValue={handleToggleNewAnnouncements}
              />
            </View>

            <View className="flex-row flex-nowrap items-center justify-between gap-x-4">
              <Text className="flex-1 font-sans-regular text-xl text-sky-900">
                Notificações novas
              </Text>
              <SwitchButton
                value={isNewNotificationsActive}
                onChangeValue={handleToggleNewNotifications}
              />
            </View>
          </View>

          <Separator orientation="horizontal" />

          <View className="gap-y-6">
            <View className="gap-y-2">
              <Text className="font-sans-semibold text-sm uppercase text-sky-900/50">
                Privacidade
              </Text>
              <Text className="font-sans-semibold text-xl text-sky-900">
                Entenda como seus dados são utilizados, compartilhados e protegidos
              </Text>
            </View>

            <TouchableOpacity
              className="flex-row flex-nowrap items-center justify-between gap-x-4"
              activeOpacity={0.7}
              onPress={handleShowTermsAndConditions}
            >
              <Text className="flex-1 font-sans-regular text-xl text-sky-900">
                Termos e Condições
              </Text>
              <ChevronRightOutlined className="pointer-events-none h-6 w-6 fill-sky-900 leading-none" />
            </TouchableOpacity>
          </View>

          <Separator orientation="horizontal" />

          <AnchorButton
            value="Sair da conta"
            className="mx-auto my-4"
            onPress={handleSignOut}
          />
        </View>
        <Footer />
      </ScreenScrollView>
      <TermsAndConditions isVisible={isTermsAndConditionsBottomSheetActive} />
    </>
  )
}
