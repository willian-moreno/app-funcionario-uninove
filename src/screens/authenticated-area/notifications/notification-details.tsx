import { useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SharedValue } from 'react-native-reanimated'

import CloseOutlined from '@material-symbols/svg-600/outlined/close.svg'

import type { Notification } from '@@types/notification'

import { BottomSheet } from '@components/bottom-sheet'
import { Loading } from '@components/loading'

import { DEFAULT_DATETIME, formatDateToLocale } from '@utils/format-date-to-locale'
import { svgCssInterop } from '@utils/svg-css-interop'

svgCssInterop([CloseOutlined])

type Props = {
  isVisible: SharedValue<boolean>
  notification: Notification | null
  onClose: () => void
}

export function NotificationDetails({ isVisible, notification, onClose }: Props) {
  function handleCloseBottomSheet() {
    isVisible.set(false)

    onClose()
  }

  useEffect(() => {
    if (notification !== null) {
      isVisible.set(true)

      return
    }

    isVisible.set(false)
  }, [notification])

  return (
    <>
      <BottomSheet.Overlay isVisible={isVisible} onClose={handleCloseBottomSheet} />
      <BottomSheet.Content isVisible={isVisible}>
        {notification ? (
          <View className="flex-1 gap-y-6 px-6 pt-6">
            <View className="gap-y-2">
              <View className="flex-row justify-between gap-x-6">
                <Text
                  className="my-auto flex-1 font-sans-bold text-2xl text-sky-900"
                  numberOfLines={2}
                >
                  {notification.title}
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
                {formatDateToLocale(notification.createdAt, DEFAULT_DATETIME)}
              </Text>
            </View>
            <ScrollView
              className="gap-y-6"
              contentContainerClassName="flex-grow pb-6 gap-y-6"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text className="font-sans-regular text-xl text-sky-900">
                {notification.description}
              </Text>
            </ScrollView>
          </View>
        ) : (
          <Loading />
        )}
      </BottomSheet.Content>
    </>
  )
}
