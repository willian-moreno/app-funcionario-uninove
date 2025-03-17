import { ProfileButton } from '@components/profile-button'
import { VacancieSvg } from '@components/vacancie-svg'
import { Dimensions, Text, View } from 'react-native'

export function EmployeeOnVacation() {
  const windowWidth = Math.round(Dimensions.get('window').width)

  const svgDecreaseLeft = windowWidth * 0.3
  const svgWidth = windowWidth + windowWidth * 0.25
  const svgHeight = svgWidth * 0.85

  return (
    <View className="flex-1 gap-5">
      <ProfileButton fullUserName="Willian Moreno" onPress={() => {}} />
      <View className="mt-auto gap-2">
        <Text className="font-sans-bold text-xl text-sky-800">
          Aproveite suas férias para descansar e recarregar as energias.
        </Text>
        <Text className="font-sans-bold text-xl text-sky-800">
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
