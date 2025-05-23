import { useCallback, useContext, useState } from 'react'
import { FlatList, Pressable, RefreshControl, Text, TouchableOpacity, View } from 'react-native'

import BookOutlined from '@material-symbols/svg-600/outlined/book.svg'
import DentistryOutlined from '@material-symbols/svg-600/outlined/dentistry.svg'
import EmojiLanguageOutlined from '@material-symbols/svg-600/outlined/emoji_language.svg'
import MedicalServicesOutlined from '@material-symbols/svg-600/outlined/medical_services.svg'
import NotificationsOutlined from '@material-symbols/svg-600/outlined/notifications.svg'
import OpenInNewOutlined from '@material-symbols/svg-600/outlined/open_in_new.svg'
import QrCodeOutlined from '@material-symbols/svg-600/outlined/qr_code.svg'
import RestaurantOutlined from '@material-symbols/svg-600/outlined/restaurant.svg'
import TheaterComedyOutlined from '@material-symbols/svg-600/outlined/theater_comedy.svg'
import { useNavigation } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import type { Announcement } from '@@types/announcement'

import { AnnouncementCard } from '@components/announcement-card'
import { Bedge } from '@components/bedge'
import { Button } from '@components/button'
import { Footer } from '@components/footer'
import { ProfileButton } from '@components/profile-button'
import { ScreenScrollView } from '@components/screen-scroll-view'
import { TagButton } from '@components/tag-button'

import { AuthContext } from '@contexts/auth-context-provider'

import { cn } from '@utils/cn'
import { SCREEN_WIDTH } from '@utils/dimensions'
import { svgCssInterop } from '@utils/svg-css-interop'

svgCssInterop([
  BookOutlined,
  DentistryOutlined,
  EmojiLanguageOutlined,
  MedicalServicesOutlined,
  NotificationsOutlined,
  OpenInNewOutlined,
  QrCodeOutlined,
  RestaurantOutlined,
  TheaterComedyOutlined,
])

export function Home() {
  const navigation = useNavigation()

  const { auth } = useContext(AuthContext)

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    return Array.from({ length: 6 }).map((_, index) => ({
      id: index,
      title: 'Renovação de crachá de estacionamento 2025',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      department: 'Desenvolvimento',
      publishedAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * index).toISOString(),
      isNew: index < 2,
    }))
  })

  const [refreshing, setRefreshing] = useState(false)

  const containerWidth = SCREEN_WIDTH - 48

  const benefitsAndServices = [
    {
      title: 'NotreDame Intermédica',
      Icon: MedicalServicesOutlined,
      onPress: () => {
        Linking.openURL('https://portal-beneficiario.gndi.com.br/')
      },
    },
    {
      title: 'Metlife',
      Icon: DentistryOutlined,
      onPress: () => {
        Linking.openURL('https://redecredenciada.metlife.com.br/')
      },
    },
    {
      title: 'Ticke Edenred',
      Icon: RestaurantOutlined,
      onPress: () => {
        Linking.openURL('https://www.ticket.com.br/portal-usuario/consulta-saldo')
      },
    },
    {
      title: 'Sesc',
      Icon: TheaterComedyOutlined,
      onPress: () => {
        Linking.openURL('https://centralrelacionamento.sescsp.org.br/')
      },
    },
    {
      title: 'Voxy',
      Icon: EmojiLanguageOutlined,
      onPress: () => {
        Linking.openURL('https://inglesuninove.voxy.com/v2/#/login')
      },
    },
    {
      title: 'ExLibris',
      Icon: BookOutlined,
      onPress: () => {
        Linking.openURL(
          'https://uninove.primo.exlibrisgroup.com/discovery/search?vid=55UNINOVE_INST:UNINOVE',
        )
      },
    },
  ]

  const toolsAndSupport = [
    {
      title: 'Service Desk - GLPI',
      onPress: () => {
        Linking.openURL('https://glpi.uninove.br')
      },
    },
    {
      title: 'RH - TOTVS',
      onPress: () => {
        Linking.openURL('https://portalrh.uninove.br')
      },
    },
    {
      title: 'Email - Microsoft Outlook',
      onPress: () => {
        Linking.openURL(`https://outlook.live.com/mail/0/inbox?login_hint=${auth.user.email}`)
      },
    },
  ]

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  function handleNavigateToMyProfileScreen() {
    navigation.navigate('my_profile')
  }

  function handleNavigateToNotificationsScreen() {
    navigation.navigate('notifications')
  }

  function handleNavigateToQRCodeScreen() {
    navigation.navigate('qr_code')
  }

  return (
    <>
      <ScreenScrollView
        contentContainerClassName="p-0 py-6"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View className="flex-1 gap-y-6">
          <View className="flex-row items-center justify-between gap-x-6 px-6">
            <View className="flex-row items-center gap-x-4">
              <ProfileButton
                userNameInitials={auth.user.nameInitials}
                onPress={handleNavigateToMyProfileScreen}
              />
              <Text className="font-sans-bold text-2xl text-sky-900">
                Olá, {auth.user.firstName}
              </Text>
            </View>
            <Bedge.Root>
              <TouchableOpacity
                className="aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-50 shadow shadow-sky-900/70"
                activeOpacity={0.7}
                onPress={handleNavigateToNotificationsScreen}
              >
                <NotificationsOutlined className="pointer-events-none h-8 w-8 fill-sky-900" />
              </TouchableOpacity>
              <Bedge.Dot />
            </Bedge.Root>
          </View>
          <View className="gap-y-9">
            {announcements.length > 0 && (
              <View>
                <View className="mb-3 flex-row items-center justify-between gap-x-4 px-6">
                  <Text className="flex-1 font-sans-bold text-2xl text-sky-900">Comunicados</Text>
                  <TagButton value="Exibir todos" />
                </View>
                <FlatList
                  data={announcements}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <AnnouncementCard
                      announcement={item}
                      style={{ width: containerWidth }}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName={cn('gap-x-4 px-6 py-3', {
                    'flex-1': announcements.length === 0,
                  })}
                  horizontal
                  ListFooterComponent={
                    <TouchableOpacity
                      className="flex-1 items-center justify-center bg-sky-50 p-6 shadow shadow-sky-900/70"
                      activeOpacity={0.7}
                      style={{ width: containerWidth }}
                    >
                      <Text className="font-sans-bold text-2xl text-sky-900">Exibir todos</Text>
                    </TouchableOpacity>
                  }
                />
              </View>
            )}
            <View>
              <Text className="mb-3 px-6 font-sans-bold text-2xl text-sky-900">
                Benefícios e serviços
              </Text>
              <FlatList
                data={benefitsAndServices}
                keyExtractor={(item) => item.title}
                renderItem={({ item: { title, Icon, onPress } }) => (
                  <TouchableOpacity
                    className="aspect-square w-[35vw] justify-between gap-y-6 bg-sky-50 p-4 shadow shadow-sky-900/70"
                    activeOpacity={0.7}
                    onPress={onPress}
                  >
                    <Icon className="h-8 w-8 fill-sky-400" />
                    <Text className="font-sans-bold text-lg leading-tight text-sky-900">
                      {title}
                    </Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-x-4 px-6 py-3"
                horizontal
              />
            </View>
            <View className="gap-y-6 px-6">
              <Text className="font-sans-bold text-2xl text-sky-900">Ferramentas e suporte</Text>
              <View className="gap-y-4">
                {toolsAndSupport.map(({ title, onPress }) => (
                  <Button
                    key={title}
                    className="flex-row justify-between px-4"
                    variant="secondary"
                    onPress={onPress}
                  >
                    <Text className="font-sans-bold text-lg text-sky-900">{title}</Text>
                    <OpenInNewOutlined className="pointer-events-none h-6 w-6 fill-sky-900" />
                  </Button>
                ))}
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </ScreenScrollView>
      <Pressable
        className="absolute bottom-6 right-6 h-20 w-20 items-center justify-center rounded-full bg-sky-800 shadow shadow-sky-900/70"
        onPress={handleNavigateToQRCodeScreen}
      >
        <QrCodeOutlined className="pointer-events-none h-12 w-12 fill-white" />
      </Pressable>
    </>
  )
}
