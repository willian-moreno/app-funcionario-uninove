import { BottomSheet } from '@components/bottom-sheet'
import CloseOutlined from '@material-symbols/svg-600/outlined/close.svg'
import { svgCssInterop } from '@utils/svg-css-interop'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SharedValue } from 'react-native-reanimated'

svgCssInterop([CloseOutlined])

type Props = {
  isVisible: SharedValue<boolean>
}

export function QRCodeReader({ isVisible }: Props) {
  function handleCloseBottomSheet() {
    isVisible.set(false)
  }

  return (
    <>
      <BottomSheet.Overlay isVisible={isVisible} onClose={handleCloseBottomSheet} />
      <BottomSheet.Content isVisible={isVisible} className="bg-sky-950">
        <View className="flex-1 gap-y-6 px-6 pt-6">
          <View className="gap-y-2">
            <View className="flex-row justify-between gap-x-6">
              <Text className="my-auto flex-1 font-sans-bold text-2xl text-white" numberOfLines={2}>
                Leitor de QR Code
              </Text>
              <TouchableOpacity
                className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-transparent"
                activeOpacity={1}
                onPress={handleCloseBottomSheet}
              >
                <CloseOutlined className="pointer-events-none h-8 w-8 fill-white" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            className="gap-y-6"
            contentContainerClassName="flex-grow gap-y-6 pb-6"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          ></ScrollView>
        </View>
      </BottomSheet.Content>
    </>
  )
}
