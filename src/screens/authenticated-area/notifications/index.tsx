import { Notification } from '@@types/notification'
import { Footer } from '@components/footer'
import { Separator } from '@components/separator'
import { useAuth } from '@hooks/use-auth'
import ArrowBackOutlined from '@material-symbols/svg-600/outlined/arrow_back.svg'
import ChevronRightOutlined from '@material-symbols/svg-600/outlined/chevron_right.svg'
import NotificationsOffOutlined from '@material-symbols/svg-600/outlined/notifications_off.svg'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { cn } from '@utils/cn'
import { DEFAULT_DATETIME, formatDateToLocale } from '@utils/format-date-to-locale'
import { svgCssInterop } from '@utils/svg-css-interop'
import { useCallback, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { NotificationDetails } from './notification-details'

svgCssInterop([ArrowBackOutlined, ChevronRightOutlined, NotificationsOffOutlined])

export function Notifications() {
  const { signOut } = useAuth()

  const navigation = useNavigation()

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return Array.from({ length: 10 }).map((_, index) => ({
      id: index,
      title: 'Lorem Ipsum is simply ' + index,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      createdAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * index).toISOString(),
      isVisualised: false,
    }))
  })

  const [activeNotification, setActiveNotification] = useState<Notification | null>(null)

  const isBottomSheetActive = useSharedValue(false)

  async function handleGoBack() {
    const canGoBack = navigation.canGoBack()

    if (!canGoBack) {
      await signOut()

      return
    }

    navigation.goBack()
  }

  function handleTouchNotification(notification: Notification, index: number) {
    if (notification.isVisualised) {
      setActiveNotification({ ...notification })

      return
    }

    setNotifications((state) =>
      state.map((item, i) => {
        if (i === index) {
          item.isVisualised = true
        }

        return item
      }),
    )

    setActiveNotification({ ...notifications[index] })
  }

  function handleCloseBottomSheet() {
    setActiveNotification(null)
  }

  useFocusEffect(
    useCallback(() => {
      isBottomSheetActive.set(false)

      setActiveNotification(null)
    }, []),
  )

  return (
    <>
      <View className="flex-1 gap-y-6 px-6 pt-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-50 shadow shadow-sky-900/70"
            activeOpacity={0.7}
            onPress={handleGoBack}
          >
            <ArrowBackOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
          </TouchableOpacity>
        </View>

        <Text className="font-sans-bold text-2xl text-sky-900">Notificações</Text>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow pb-6"
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className={cn('flex-1 flex-row items-center gap-x-6 py-6', {
                'pt-0': index === 0,
                'pb-0': index + 1 === notifications.length,
              })}
              activeOpacity={0.7}
              onPress={() => handleTouchNotification(item, index)}
            >
              <View className="pointer-events-none flex-1 gap-y-2">
                <Text
                  className={cn('font-sans-semibold text-xl text-sky-900', {
                    'text-sky-900/50': item.isVisualised,
                  })}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text
                  className={cn('font-sans-regular text-xl text-sky-900', {
                    'text-sky-900/50': item.isVisualised,
                  })}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
                <Text
                  className={cn('font-sans-regular text-lg text-sky-900/50', {
                    'text-sky-900/20': item.isVisualised,
                  })}
                >
                  {formatDateToLocale(item.createdAt, DEFAULT_DATETIME)}
                </Text>
              </View>
              <ChevronRightOutlined className="pointer-events-none h-6 w-6 fill-sky-900 leading-none" />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <Separator orientation="horizontal" />}
          ListFooterComponentClassName="mt-auto"
          ListFooterComponent={<Footer />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center gap-y-6">
              <NotificationsOffOutlined className="pointer-events-none h-28 w-28 fill-sky-400 leading-none" />
              <Text className="text-center font-sans-bold text-3xl text-sky-900">
                Sem notificações
              </Text>
            </View>
          }
        />
      </View>
      <NotificationDetails
        isVisible={isBottomSheetActive}
        notification={activeNotification}
        onClose={handleCloseBottomSheet}
      />
    </>
  )
}
