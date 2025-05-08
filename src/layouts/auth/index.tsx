import { View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import LogoSvg from '@assets/logo.svg'

import { Footer } from '@components/footer'
import { KeyboardAvoiding } from '@components/keyboard-avoiding'

type Props = {
  children: React.ReactNode
}

export function AuthLayout({ children }: Props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-sky-50">
        <KeyboardAvoiding.Root>
          <KeyboardAvoiding.View>
            <KeyboardAvoiding.Scroll>
              <View className="mx-auto flex w-52">
                <LogoSvg height={150} style={{ marginTop: 'auto', marginBottom: 'auto' }} />
              </View>
              {children}
              <Footer variant="diluted" />
            </KeyboardAvoiding.Scroll>
          </KeyboardAvoiding.View>
        </KeyboardAvoiding.Root>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
