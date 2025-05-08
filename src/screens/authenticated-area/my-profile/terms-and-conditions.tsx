import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SharedValue } from 'react-native-reanimated'

import CloseOutlined from '@material-symbols/svg-600/outlined/close.svg'

import { BottomSheet } from '@components/bottom-sheet'

import { DEFAULT_DATE, formatDateToLocale } from '@utils/format-date-to-locale'
import { svgCssInterop } from '@utils/svg-css-interop'

svgCssInterop([CloseOutlined])

type Props = {
  isVisible: SharedValue<boolean>
}

export function TermsAndConditions({ isVisible }: Props) {
  function handleCloseBottomSheet() {
    isVisible.set(false)
  }

  return (
    <>
      <BottomSheet.Overlay isVisible={isVisible} onClose={handleCloseBottomSheet} />
      <BottomSheet.Content isVisible={isVisible}>
        <View className="flex-1 gap-y-6 px-6 pt-6">
          <View className="gap-y-2">
            <View className="flex-row justify-between gap-x-6">
              <Text
                className="my-auto flex-1 font-sans-bold text-2xl text-sky-900"
                numberOfLines={2}
              >
                Termos e Condições
              </Text>
              <TouchableOpacity
                className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-50 shadow shadow-sky-900/70"
                activeOpacity={0.7}
                onPress={handleCloseBottomSheet}
              >
                <CloseOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
              </TouchableOpacity>
            </View>
            <Text className="font-sans-regular text-lg text-sky-900/50">
              Atualizado em {formatDateToLocale('2025-01-21', DEFAULT_DATE)}
            </Text>
          </View>
          <ScrollView
            className="gap-y-6"
            contentContainerClassName="flex-grow gap-y-6 pb-6"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text className="font-sans-regular text-xl text-sky-900">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien
              vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus
              leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus
              bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
              hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia
              nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit.
              Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
              tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
              fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
              integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora
              torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur
              adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
              cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
              Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
              malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
              sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
              sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
              sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
              diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
              massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
              aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien
              vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus
              leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus
              bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
              hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia
              nostra inceptos himenaeos.
            </Text>
          </ScrollView>
        </View>
      </BottomSheet.Content>
    </>
  )
}
