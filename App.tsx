import 'react-native-gesture-handler'
import './global.css'

import { Loading } from '@components/loading'
import {
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_700Bold,
  useFonts,
} from '@expo-google-fonts/open-sans'
import { Routes } from '@routes/index'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

export function App() {
  const [fontsLoaded] = useFonts({ OpenSans_400Regular, OpenSans_500Medium, OpenSans_700Bold })

  return (
    <View className="flex-1 bg-sky-100">
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </View>
  )
}
