import VacancieSvg from '@assets/vacancie.svg'
import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { ScreenScrollView } from '@components/screen-scroll-view'
import { AuthContext } from '@contexts/auth-context-provider'
import VolumeMuteOutlined from '@material-symbols/svg-500/outlined/volume_mute.svg'
import VolumeUpOutlined from '@material-symbols/svg-500/outlined/volume_up.svg'
import { useNavigation } from '@react-navigation/native'
import { svgCssInterop } from '@utils/svg-css-interop'
import { Audio } from 'expo-av'
import { useContext, useEffect, useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'

svgCssInterop([VolumeMuteOutlined, VolumeUpOutlined])

export function EmployeeOnVacation() {
  const navigation = useNavigation()

  const { auth, isLoading: isScreenLoading } = useContext(AuthContext)

  const [sound, setSound] = useState<Audio.Sound>()

  const [isSoundMuted, setIsSoundMuted] = useState(true)

  const windowWidth = Math.round(Dimensions.get('window').width)

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

  if (isScreenLoading) {
    return <Loading />
  }

  return (
    <ScreenScrollView>
      <View className="flex-1 gap-y-6">
        <View className="flex-row items-center gap-x-2">
          <ProfileButton
            userNameInitials={auth?.user.nameInitials}
            onPress={handleNavigateToMyProfileScreen}
          />
          <Text className="font-sans-bold text-2xl text-sky-900">Olá, {auth?.user.firstName}</Text>
        </View>
        <View className="mt-auto gap-x-4">
          <Text className="font-sans-bold text-xl text-sky-900">
            Aproveite suas férias para descansar e recarregar as energias.
          </Text>
          <Text className="font-sans-bold text-xl text-sky-900">
            Você merece! Boas férias! <Text className="text-2xl">😎</Text>
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
              className="absolute bottom-0 right-0 ml-auto aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-100"
              activeOpacity={0.7}
              onPress={handleToggleSoundMutedStatus}
            >
              <VolumeMuteOutlined className="h-8 w-8 fill-sky-900" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="absolute bottom-0 right-0 ml-auto aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-800"
              activeOpacity={0.7}
              onPress={handleToggleSoundMutedStatus}
            >
              <VolumeUpOutlined className="h-8 w-8 fill-white" />
            </TouchableOpacity>
          ))}
      </View>
    </ScreenScrollView>
  )
}
