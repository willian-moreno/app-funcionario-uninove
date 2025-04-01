import { AuthContextProvider } from '@contexts/auth-context-provider'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <View className="flex-1 bg-sky-50">
          <AppRoutes />
        </View>
      </AuthContextProvider>
    </NavigationContainer>
  )
}
