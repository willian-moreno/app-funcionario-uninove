import { AuthContextProvider } from '@contexts/auth-context-provider'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  children: React.ReactNode
}

export function AuthenticatedArea({ children }: Props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-100">
        <AuthContextProvider>{children}</AuthContextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
