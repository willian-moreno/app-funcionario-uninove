import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-sky-50">
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
