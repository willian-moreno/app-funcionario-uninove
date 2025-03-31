import './global.css'

import { Loading } from '@components/loading'
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  useFonts,
} from '@expo-google-fonts/open-sans'
import { Routes } from '@routes/index'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as SplashScreen from 'expo-splash-screen'
import { setBackgroundColorAsync } from 'expo-system-ui'
import { useEffect } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    setBackgroundColorAsync('#f0f9ff')
  }, [])

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-sky-50">{fontsLoaded ? <Routes /> : <Loading />}</View>
    </GestureHandlerRootView>
  )
}
