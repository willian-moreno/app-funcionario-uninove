import { VacancieSvg } from '@components/vacancie-svg'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'

export function EmployeeOnVacation() {
  const windowWidth = Math.round(Dimensions.get('window').width)

  const svgDecreaseLeft = windowWidth * 0.3
  const svgWidth = windowWidth + windowWidth * 0.25
  const svgHeight = svgWidth * 0.85

  return (
    <View className="flex-1 gap-5">
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="aspect-square h-16 w-16 items-center justify-center rounded-full border-4 border-slate-300 bg-sky-800"
          activeOpacity={0.7}
        >
          <Text className="text-xl font-semibold text-white">WM</Text>
        </TouchableOpacity>
        <Text className="font-sans-bold text-2xl text-sky-800">Olá, Willian</Text>
      </View>
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
