import './global.css'

import { Loading } from '@components/loading'
import { OpenSans_400Regular, OpenSans_700Bold, useFonts } from '@expo-google-fonts/open-sans'
import { Routes } from '@routes/index'
import { StatusBar, View } from 'react-native'

export function App() {
  const [fontsLoaded] = useFonts({ OpenSans_400Regular, OpenSans_700Bold })

  return (
    <View className="flex-1 bg-sky-100">
      <StatusBar barStyle="dark-content" className="bg-sky-100" />
      {fontsLoaded ? <Routes /> : <Loading />}
    </View>
  )
}
