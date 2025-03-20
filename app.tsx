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
import { useEffect } from 'react'
import { View } from 'react-native'

export function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  })

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  }, [])

  return <View className="flex-1 bg-sky-50">{fontsLoaded ? <Routes /> : <Loading />}</View>
}
