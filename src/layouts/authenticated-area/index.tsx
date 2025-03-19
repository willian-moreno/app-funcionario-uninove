import { AuthContextProvider } from '@contexts/auth-context-provider'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

type Props = {
  children: React.ReactNode
}

export function AuthenticatedArea({ children }: Props) {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#f1f5f9" />
      <View className="flex-1 bg-slate-100">
        <AuthContextProvider>{children}</AuthContextProvider>
      </View>
    </>
  )
}
