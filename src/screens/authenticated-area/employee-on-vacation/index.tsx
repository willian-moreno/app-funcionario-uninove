import { Loading } from '@components/loading'
import { ProfileButton } from '@components/profile-button'
import { VacancieSvg } from '@components/vacancie-svg'
import { AuthContext } from '@contexts/auth-context-provider'
import { useContext } from 'react'
import { Dimensions, Text, View } from 'react-native'

export function EmployeeOnVacation() {
  const { auth, isLoading: isScreenLoading } = useContext(AuthContext)

  const windowWidth = Math.round(Dimensions.get('window').width)

  const svgDecreaseLeft = windowWidth * 0.3
  const svgWidth = windowWidth + windowWidth * 0.25
  const svgHeight = svgWidth * 0.85

  if (isScreenLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 gap-y-6">
      <View className="flex-row items-center gap-2">
        <ProfileButton userNameInitials={auth?.user.nameInitials} onPress={() => {}} />
        <Text className="font-sans-bold text-2xl text-sky-900">Olá, {auth?.user.firstName}</Text>
      </View>
      <View className="mt-auto gap-4">
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
          }}
        />
      </View>
    </View>
  )
}
