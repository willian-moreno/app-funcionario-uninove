import { Footer } from '@components/footer'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, View } from 'react-native'

type Props = {
  children: React.ReactNode
}

export function AuthenticatedArea({ children }: Props) {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#f1f5f9" />
      <View className="flex-1 bg-slate-100 p-6">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          {children}
          <Footer variant="default" />
        </ScrollView>
      </View>
    </>
  )
}
