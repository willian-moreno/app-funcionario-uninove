import { View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import { AuthContextProvider } from '@contexts/auth-context-provider'

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
