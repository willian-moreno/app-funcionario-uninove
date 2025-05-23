import { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import VolumeMuteOutlined from '@material-symbols/svg-600/outlined/volume_mute.svg'
import VolumeUpOutlined from '@material-symbols/svg-600/outlined/volume_up.svg'
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av'

import VacancieSvg from '@assets/vacancie.svg'

import { ProfileButton } from '@components/profile-button'
import { ScreenScrollView } from '@components/screen-scroll-view'

import { AuthContext } from '@contexts/auth-context-provider'

import { SCREEN_WIDTH } from '@utils/dimensions'
import { svgCssInterop } from '@utils/svg-css-interop'

svgCssInterop([VolumeMuteOutlined, VolumeUpOutlined])

export function EmployeeOnVacation() {
  const navigation = useNavigation()

  const { auth } = useContext(AuthContext)

  const [sound, setSound] = useState<Audio.Sound>()

  const [isSoundMuted, setIsSoundMuted] = useState(true)

  const windowWidth = Math.round(SCREEN_WIDTH)

  const svgDecreaseLeft = windowWidth * 0.3
  const svgWidth = windowWidth + windowWidth * 0.25
  const svgHeight = svgWidth * 0.85

  async function handleNavigateToMyProfileScreen() {
    navigation.navigate('my_profile')
  }

  async function loadSound() {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    })

    const { sound } = await Audio.Sound.createAsync(require('@assets/guitar-on-the-beach.mp3'), {
      isLooping: true,
      isMuted: true,
      shouldPlay: false,
    })

    setSound(sound)

    await sound.playAsync()
  }

  async function handleToggleSoundMutedStatus() {
    if (!sound) {
      return
    }

    setIsSoundMuted(!isSoundMuted)

    await sound.setIsMutedAsync(!isSoundMuted)
  }

  useEffect(() => {
    loadSound()

    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [])

  return (
    <ScreenScrollView>
      <View className="flex-1 gap-y-6">
        <View className="flex-row items-center gap-x-4">
          <ProfileButton
            userNameInitials={auth?.user.nameInitials}
            onPress={handleNavigateToMyProfileScreen}
          />
          <Text className="font-sans-bold text-2xl text-sky-900">Olá, {auth?.user.firstName}</Text>
        </View>
        <View className="mt-auto gap-y-4">
          <Text className="font-sans-bold text-4xl text-sky-900">Você está de férias!!</Text>
          <Text className="font-sans-bold text-xl text-sky-900">
            Aproveite para descansar e recarregar as energias! <Text className="text-2xl">😎</Text>
          </Text>
          <Text className="font-sans-regular text-lg text-sky-900/50">
            Não se preocupe, suas notificações foram silenciadas.
          </Text>
        </View>
        <View className="mt-auto flex-1 justify-end">
          <VacancieSvg
            style={{
              width: svgWidth,
              height: svgHeight,
              marginLeft: -svgDecreaseLeft,
              marginBottom: 20,
            }}
          />
        </View>

        {sound &&
          (isSoundMuted ? (
            <TouchableOpacity
              className="absolute bottom-0 right-0 ml-auto aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-50 shadow shadow-sky-900/70"
              activeOpacity={0.7}
              onPress={handleToggleSoundMutedStatus}
            >
              <VolumeMuteOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="absolute bottom-0 right-0 ml-auto aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-800 shadow shadow-sky-900/70"
              activeOpacity={0.7}
              onPress={handleToggleSoundMutedStatus}
            >
              <VolumeUpOutlined className="pointer-events-none h-8 w-8 fill-white" />
            </TouchableOpacity>
          ))}
      </View>
    </ScreenScrollView>
  )
}
