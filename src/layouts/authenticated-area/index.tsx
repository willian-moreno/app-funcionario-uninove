import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  children: React.ReactNode
}

export function AuthenticatedArea({ children }: Props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">{children}</SafeAreaView>
    </SafeAreaProvider>
  )
}
