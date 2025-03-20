import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <View className="flex-1 bg-sky-50">
        <AppRoutes />
      </View>
    </NavigationContainer>
  )
}
