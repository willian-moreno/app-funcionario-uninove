import './global.css'

import { useEffect } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  useFonts,
} from '@expo-google-fonts/open-sans'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'

import { Loading } from '@components/loading'

import { Routes } from '@routes/index'

SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({
  duration: 1000,
})

export function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide()
    }
  }, [fontsLoaded])

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    SystemUI.setBackgroundColorAsync('#f0f9ff')
  }, [])

  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <View className="flex-1 bg-sky-50">{fontsLoaded ? <Routes /> : <Loading />}</View>
    </GestureHandlerRootView>
  )
}
