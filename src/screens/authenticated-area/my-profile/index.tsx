import { IconButton } from '@components/icon-button'
import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { Separator } from '@components/separator'
import { SwitchButton } from '@components/switch-button'
import { AuthContext } from '@contexts/auth-context-provider'
import { useBiometrics } from '@hooks/use-biometrics'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { findProfileStorage } from '@storage/auth/find-profile-storage'
import { updateProfileStorage } from '@storage/auth/update-profile-storage'
import { useCallback, useContext, useState } from 'react'
import { Text, View } from 'react-native'

type Profile = {
  isBiometricsActive: boolean
  isNewAnnouncementsActive: boolean
  isNewNotificationsActive: boolean
}

export function MyProfile() {
  const { isLoading: isAuthLoading, auth, signOut } = useContext(AuthContext)

  const navigation = useNavigation()

  const { isFingerprintAvailable } = useBiometrics()

  const [profile, setProfile] = useState<Profile>({
    isBiometricsActive: false,
    isNewAnnouncementsActive: false,
    isNewNotificationsActive: false,
  })

  const isBiometricsActive = profile.isBiometricsActive && isFingerprintAvailable
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

  async function findStoredProfile() {
    try {
      const profile = await findProfileStorage()

      if (!profile) {
        setProfile({
          isBiometricsActive: false,
          isNewAnnouncementsActive: false,
          isNewNotificationsActive: false,
        })

        return
      }

      setProfile(profile)
    } catch (error) {}
  }

  async function handleToggleBiometrics(isActive: boolean) {
    try {
      setProfile((state) => ({ ...state, isBiometricsActive: isActive }))
      await updateProfileStorage({ ...profile, isBiometricsActive: isActive })
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

  useFocusEffect(
    useCallback(() => {
      findStoredProfile()
    }, []),
  )

  if (isAuthLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 gap-y-5">
      <View className="flex-row items-center justify-between">
        <IconButton icon="arrow-back-outline" onPress={handleGoBack} />
        <IconButton icon="notifications-outline" />
      </View>

      <Text className="font-sans-bold text-2xl text-sky-800">Meu perfil</Text>

      <View className="flex-row items-center gap-2">
        <ProfileButton userNameInitials={auth?.user.nameInitials} disabled />
        <View className="flex-1">
          <Text className="font-sans-semibold text-lg leading-tight text-sky-800" numberOfLines={1}>
            {auth?.user.fullName}
          </Text>
          <Text className="font-sans-regular text-lg leading-tight text-sky-800">
            {auth?.user.registration}
          </Text>
        </View>
      </View>

      <Separator orientation="horizontal" />

      <View className="gap-y-5">
        <View className="gap-y-1">
          <Text className="text-sm font-semibold uppercase text-sky-800/50">Segurança</Text>
          <Text className="font-sans-semibold text-xl text-sky-800">
            Configure a segurança da sua conta
          </Text>
        </View>

        <View className="flex-row flex-nowrap items-center justify-between gap-2">
          <Text className="flex-1 font-sans-regular text-xl text-sky-800">
            Usar biometria para desbloquear o app e acessar a conta
          </Text>
          <SwitchButton
            value={isBiometricsActive}
            disabled={!isFingerprintAvailable}
            onChangeValue={handleToggleBiometrics}
          />
        </View>
      </View>

      <Separator orientation="horizontal" />

      <View className="gap-y-5">
        <View className="gap-y-1">
          <Text className="text-sm font-semibold uppercase text-sky-800/50">Comunicação</Text>
          <Text className="font-sans-semibold text-xl text-sky-800">
            Escolha o tipo de comunicação que você quer receber no seu dispositivo móvel
          </Text>
        </View>

        <View className="flex-row flex-nowrap items-center justify-between gap-2">
          <Text className="flex-1 font-sans-regular text-xl text-sky-800">Comunicados novos</Text>
          <SwitchButton
            value={isNewAnnouncementsActive}
            onChangeValue={handleToggleNewAnnouncements}
          />
        </View>

        <View className="flex-row flex-nowrap items-center justify-between gap-2">
          <Text className="flex-1 font-sans-regular text-xl text-sky-800">Notificações novas</Text>
          <SwitchButton
            value={isNewNotificationsActive}
            onChangeValue={handleToggleNewNotifications}
          />
        </View>
      </View>

      <Separator orientation="horizontal" />
    </View>
  )
}
