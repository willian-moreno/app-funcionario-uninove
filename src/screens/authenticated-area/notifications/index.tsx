import { useCallback, useState } from 'react'
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import ArrowBackOutlined from '@material-symbols/svg-600/outlined/arrow_back.svg'
import NotificationsOffOutlined from '@material-symbols/svg-600/outlined/notifications_off.svg'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import type { Notification } from '@@types/notification'

import { Footer } from '@components/footer'
import { NotificationCard } from '@components/notification-card'
import { Separator } from '@components/separator'
import { TagButton } from '@components/tag-button'

import { useAuth } from '@hooks/use-auth'

import { cn } from '@utils/cn'
import { svgCssInterop } from '@utils/svg-css-interop'

import { NotificationDetails } from './notification-details'

svgCssInterop([ArrowBackOutlined, NotificationsOffOutlined])

export function Notifications() {
  const { signOut } = useAuth()

  const navigation = useNavigation()

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return Array.from({ length: 10 }).map((_, index) => ({
      id: index.toString(),
      title: 'Lorem Ipsum is simply ' + index,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      createdAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * index).toISOString(),
      isVisualised: false,
    }))
  })

  const numberOfNewNotifications = notifications.reduce((acc, notification) => {
    return notification.isVisualised ? acc : acc + 1
  }, 0)

  const [activeNotification, setActiveNotification] = useState<Notification | null>(null)

  const [refreshing, setRefreshing] = useState(false)

  const isBottomSheetActive = useSharedValue(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

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
      <View className="flex-1 gap-y-6 pt-6">
        <View className="flex-row items-center justify-between px-6">
          <TouchableOpacity
            className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-50 shadow shadow-sky-900/70"
            activeOpacity={0.7}
            onPress={handleGoBack}
          >
            <ArrowBackOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
          </TouchableOpacity>
        </View>

        <View className="gap-y-1 px-6">
          <View className="flex-row items-center justify-between gap-x-4">
            <Text className="font-sans-bold text-2xl text-sky-900">Notificações</Text>
            <TagButton
              className="flex-1"
              value="Marcar todas como lidas"
            />
          </View>

          {numberOfNewNotifications > 0 && (
            <Text className="font-sans-regular text-xl text-sky-400">
              {numberOfNewNotifications} novas
            </Text>
          )}
        </View>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow pb-6 px-6"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={({ item, index }) => (
            <NotificationCard
              id={item.id}
              title={item.title}
              description={item.description}
              createdAt={item.createdAt}
              isVisualised={item.isVisualised}
              className={cn({
                'pt-0': index === 0,
                'pb-0': index + 1 === notifications.length,
              })}
              onPress={() => handleTouchNotification(item, index)}
              onRemove={() => {}}
            />
          )}
          ItemSeparatorComponent={() => <Separator orientation="horizontal" />}
          ListFooterComponentStyle={{ marginTop: 'auto' }}
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
