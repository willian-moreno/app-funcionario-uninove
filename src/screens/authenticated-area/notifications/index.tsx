import { BottomSheet } from '@components/bottom-sheet'
import { Footer } from '@components/footer'
import { IconButton } from '@components/icon-button'
import { Loading } from '@components/loading'
import { Separator } from '@components/separator'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@hooks/use-auth'
import { useNavigation } from '@react-navigation/native'
import { cn } from '@utils/cn'
import { formatInTimeZone } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

type Notification = {
  id: number
  title: string
  description: string
  createdAt: string
  isVisualised: boolean
}

export function Notifications() {
  const { signOut } = useAuth()

  const navigation = useNavigation()

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return Array.from({ length: 25 }).map((_, index) => ({
      id: index,
      title: 'Título da notificação ' + index,
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

  function onBottomSheetVisibilityChange() {
    isBottomSheetActive.set(false)

    setActiveNotification(null)
  }

  function formatDate(date: string) {
    return formatInTimeZone(date, 'America/Sao_Paulo', "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
      locale: ptBR,
    })
  }

  useEffect(() => {
    if (activeNotification !== null) {
      isBottomSheetActive.value = true

      return
    }

    isBottomSheetActive.value = false
  }, [activeNotification])

  return (
    <View className="flex-1">
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-6"
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="flex-row items-center gap-x-6 py-6"
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
                {formatDate(item.createdAt)}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              className="pointer-events-none text-xl leading-none text-sky-900"
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Separator orientation="horizontal" />}
        ListHeaderComponent={
          <View className="gap-y-6">
            <View className="flex-row items-center justify-between">
              <IconButton icon="arrow-back-outline" onPress={handleGoBack} />
            </View>

            <Text className="font-sans-bold text-2xl text-sky-900">Notificações</Text>
          </View>
        }
        ListFooterComponent={<Footer />}
      />
      <BottomSheet
        isVisible={isBottomSheetActive}
        onVisibilityChange={onBottomSheetVisibilityChange}
      >
        {activeNotification ? (
          <ScrollView
            className="gap-y-6"
            contentContainerStyle={{ flexGrow: 1, padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 gap-y-6">
              <View className="flex-row items-center gap-x-6">
                <View className="gap-y-2">
                  <Text className="flex-1 font-sans-bold text-2xl text-sky-900">
                    {activeNotification.title}
                  </Text>
                  <Text className="font-sans-regular text-xl text-sky-900/50">
                    {formatDate(activeNotification.createdAt)}
                  </Text>
                </View>
                <IconButton
                  icon="close-outline"
                  className="ml-auto"
                  onPress={onBottomSheetVisibilityChange}
                />
              </View>

              <Text className="font-sans-regular text-xl text-sky-900">
                {activeNotification.description}
              </Text>
            </View>
          </ScrollView>
        ) : (
          <Loading />
        )}
      </BottomSheet>
    </View>
  )
}
